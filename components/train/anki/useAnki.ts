import { supermemo, getTimeStamp, SmCard, SmGrade } from "./sm2";
import { useLocalStorage } from "@vueuse/core";
import { shallowRef } from "vue";

interface Card extends SmCard {
    /** 用户列表相应的项目的索引号 */
    index: number
}

const performanceNow = () => performance.now()

export function useAnki<T>(cards: T[], name: string) {
    /** 推到未来复习的项目，只在内部使用 */
    const storageRef = useLocalStorage<Card[]>(`yima_${name}_anki`, [])

    /** 学习的进度，用户只读 */
    const progress = useLocalStorage(`yima_${name}_progress`, {
        meet: 0,
        familiar: 0,
    })

    /** 被用户使用的项目 */
    const card = shallowRef<T>()
    /** 用户学习的卡片，
     * 如果从localstorage仓库来，那就是第一张
     * 如果从cards来，那就是第 progress.meet 张 */
    let isFromStorage: boolean

    let startTime = performanceNow()

    const setNextCard = () => {
        const now = getTimeStamp()
        storageRef.value.sort((a, b) => a.due - b.due)
        const store = storageRef.value
        // 仓库有没有到期的
        if (store.length && store[0].due <= now) {
            isFromStorage = true
            card.value = cards[store[0].index]
            return;
        }
        // 有没有未学习的
        const meet = progress.value.meet
        if (meet < cards.length) {
            isFromStorage = false
            card.value = cards[meet]
            return;
        }
        // 被迫学习旧知识
        isFromStorage = true
        card.value = cards[store[0].index]
    }

    setNextCard()

    const answer = (right = true) => {

        //计算grade
        let grade: SmGrade = 0
        if (right) {
            const elapse = performanceNow() - startTime
            if (elapse < 1000)
                grade = 3
            else if (elapse < 2500)
                grade = 2
            else
                grade = 1
        }

        // 修改仓库数据
        if (isFromStorage) {
            storageRef.value[0] = supermemo(storageRef.value[0], grade)
        } else {
            const now = getTimeStamp()
            const newCard = supermemo({
                state: 1,
                due: now,
                last: now,
                ease: 2.3,
                index: progress.value.meet
            }, grade)
            storageRef.value.push(newCard)
            progress.value.meet += 1
        }

        // 修改进度
        if (grade === 3) {
            progress.value.familiar += 1
        }

        // 取出下一张卡片
        setNextCard()

        startTime = performanceNow()

    }

    const restart = () => {
        storageRef.value = []
        progress.value.familiar = 0
        progress.value.meet = 0
        setNextCard()
    }

    return {
        progress,
        answer,
        card,
        restart,
    }
}