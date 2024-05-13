import { useLocalStorage } from "@vueuse/core";
import { shallowRef } from 'vue'

type Record = [count: number, index: number]

export function useReview<T>(name: string, cards: readonly T[]) {
    if (cards.length < 100) throw new Error(`卡片至少100张：${cards.length}`);

    const emptyRecord = () => Array.from({ length: cards.length }, (_, i) => [-1, i] as Record)
    const storageRef = useLocalStorage<Record[]>(`yima_${name}_records`, emptyRecord)

    const cardLength = cards.length
    if (storageRef.value.length < cardLength) {
        for (let i = storageRef.value.length; i < cardLength; i++) {
            storageRef.value.push([-1, i])
        }
    } else if (storageRef.value.length > cardLength) {
        storageRef.value = storageRef.value.filter(v => v[1] < cardLength)
    }

    storageRef.value.sort((a, b) => {
        if (a[0] === 8 && b[0] < 8)
            return 1
        if (b[0] === 8 && a[0] < 8)
            return -1
        return 0
    })

    const scanProgress = () => storageRef.value.reduce((p, c) => p + Number(c[0] > 1), 0)
    const progress = shallowRef(scanProgress())
    const card = shallowRef<T>(cards[storageRef.value[0][1]])
    const isFirst = shallowRef(storageRef.value[0][0] === -1)

    const restart = () => {
        storageRef.value = emptyRecord()
        progress.value = 0
        isFirst.value = true
        card.value = cards[0]
    }

    const maxIndex = cards.length - 1
    const moveSteps = [3, 9, 21, 36, 60, 100];
    const maxMoveStepsIndex = moveSteps.length - 1

    const answer = (correct: boolean) => {
        if (!correct) {
            if (storageRef.value[0][0] > 1)
                progress.value -= 1
            storageRef.value[0][0] = -1
            isFirst.value = true
            return
        }

        const firstRecord = storageRef.value[0]
        const firstCount = ++firstRecord[0]
        if (firstCount === 2) {
            progress.value += 1
        }

        // move first card to middle parts in storage
        let step = 0
        // too much trained times, move the card to last
        if (firstCount > maxMoveStepsIndex) {
            firstRecord[0] = 8
            step = maxIndex
        } else {
            step = moveSteps[firstCount]
            if (step > maxIndex)
                step = maxIndex
        }

        storageRef.value.copyWithin(0, 1, step + 1)
        storageRef.value[step] = firstRecord

        card.value = cards[storageRef.value[0][1]]
        isFirst.value = storageRef.value[0][0] === -1
    }
    return { progress, card, isFirst, restart, answer }
}