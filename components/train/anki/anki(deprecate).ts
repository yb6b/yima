import { supermemo, SuperMemoItem, SuperMemoGrade } from "supermemo";
import { shallowRef } from "vue";
import { useLocalStorage } from "@vueuse/core";


interface Card extends SuperMemoItem {
    index: number
    due: number
}

interface middleCard {
    item: Card,
    /** 指向storage仓库的卡片的索引号，用于替换数据卡片  */
    index: number
    /** 复习开始的时间戳 */
    due: number
}

export const getNow = () => performance.now()
const getTimeStamp = () => new Date().getTime()


export function useAnki<T>(cards: T[], name: string) {
    /** 推到未来复习的项目，只在内部使用 */
    const storageRef = useLocalStorage<Card[]>(`yima_${name}_anki`, [])
    /** 重新排列，让最近到期的卡片排前 */
    storageRef.value.sort((a, b) => a.due - b.due)

    /** 当天的多次训练 */
    const midStore: middleCard[] = []

    /** 学习的进度，用户只读 */
    const progress = useLocalStorage(name + '_progress', {
        meet: 0,
        familiar: 0,
    })

    /** 是不是第一次遇到 */
    const isFirstMeet = shallowRef(true)

    /** 被用户使用的项目 */
    const card = shallowRef<T>()
    /** 用户使用的项目所对应的sm卡片 */
    let smCard: Card
    /** 从哪里取得的数据，1：storage 2：midStore 3.cards */
    let cardHome = 0
    /** 回到用时 */
    let startTime = getNow()

    const setNextCard = (reviewMode = false) => {
        startTime = getNow()
        const now = getTimeStamp()
        /** 先试试短期练习 */
        if (midStore.length) {
            if (reviewMode || now >= midStore[0].due) {
                cardHome = 2
                smCard = midStore[0].item
                card.value = cards[smCard.index]
                isFirstMeet.value = false
                return
            }
        }
        /** 再找找长期练习 */
        const store = storageRef.value
        if (store.length) {
            if (reviewMode || now >= store[0].due) {
                cardHome = 1
                smCard = store[0]
                console.log('store due', now, store[0].due);
                card.value = cards[smCard.index]
                isFirstMeet.value = false
                return
            }
        }
        /** 不需要复习就学新的 */
        if (!reviewMode) {
            const meet = progress.value.meet
            if (meet < cards.length) {
                cardHome = 3
                smCard = {
                    index: meet,
                    due: now,
                    interval: 1,
                    repetition: 0,
                    efactor: 2.5,
                }
                card.value = cards[meet]
                isFirstMeet.value = true
                return
            }
        }
        /** 如果所有的都学完了，最终只能在中间库和长期库里找 */
        if (midStore.length) {
            card.value = cards[midStore[0].item.index]
            cardHome = 2
            isFirstMeet.value = false
            return
        }
        card.value = cards[store[0].index]
        cardHome = 1
        isFirstMeet.value = false
        return
    }

    setNextCard()

    const answer = (wrong = false) => {
        let grade: SuperMemoGrade = 0
        if (wrong) {
            grade = 0
        } else {
            const elapse = getNow() - startTime
            if (elapse < 400) {
                grade = 5
            } else if (elapse < 1000) {
                grade = 4
            } else {
                grade = 3
            }
        }
        const newCard = supermemo(smCard!, grade) as Card
        newCard.index = smCard.index
        newCard.due = smCard.due + newCard.interval * 86400_000

        /** 添加到sm库里 */
        if (cardHome === 3) {
            storageRef.value.push(newCard)
        } else if (cardHome === 1) {
            storageRef.value[0] = newCard
        } else {
            storageRef.value[midStore[0].index] = newCard
        }

        /** 添加到mid库里 */
        if (grade === 5) {
            if (cardHome === 2) {
                midStore.shift()
            }
        } else {
            const dueMinutes = [1, 2, 3, 6, 10] as const
            const now = getTimeStamp()

            midStore.push({
                item: newCard,
                index: storageRef.value.length - 1,
                due: now + (cardHome === 3 ? dueMinutes[grade] * 6e4 : 6e5)
            })

            midStore.sort((a, b) => a.due - b.due)
        }

        console.log('midstore', midStore);
        /** 修改进度 */
        if (cardHome === 3) {
            progress.value.meet += 1
        }

        if (grade === 5) {
            progress.value.familiar += 1
        }

        /** 出下一题 */
        setNextCard()
        console.log('cardhome ', cardHome, smCard, card.value);
    }

    const restart = () => {
        storageRef.value = []
        midStore.length = 0
        progress.value = {
            meet: 0,
            familiar: 0,
        }

    }

    return {
        progress,
        card,
        answer,
        restart,
        isFirstMeet,
    }
}



function gradeToDueMinutes(grade: SuperMemoGrade) {
    switch (grade) {
        case 0:
            return 1
        case 1:
            return 6

        default:
            break;
    }
}