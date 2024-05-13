/**
 * 改编自 RemNote 的算法。
 * @see https://www.remnote.io/p/help/document/8g5xHDmGSotpAR9Pc
 * 
 * 学习阶段会固定在 1min 6min 10min后进行。 -- 1
 * 当达到5级速度，进入指数复习阶段：  
 * 
 * 复习阶段回答错误，进入再学习阶段。  -- 2
 * 
 * 再学习阶段如同前述， 直到5级速度。  -- 3
 */

/** forget hard good easy */
export type SmGrade = 0 | 1 | 2 | 3

export interface SmCard {
    /** 学习、复习、再学习 */
    state: 1 | 2 | 3
    /** 回顾的时间戳 */
    due: number
    /** 上一次复习的时间戳 */
    last: number
    /** 容易度，指数阶段用 */
    ease: number
    /** 困难分类值，指数阶段用*/
    difficulty?: number
    /** 上一次指数阶段最后间隔（天）, 
     * 只在 指数转再学习阶段写，在学习转指数结算读 */
    lastSpan?: number
}

export const getTimeStamp = () => new Date().getTime()
const getThisMorning = () => {
    const d = new Date()
    // 凌晨当成上一天
    if (d.getHours() < 4) {
        const t = d.getTime()
        d.setTime(t - msPerDay / 2)
    }
    d.setHours(4, 0, 0, 0)
    return d.getTime()
}
const thisMorningTimsStamp = getThisMorning()

export const createCard = (): SmCard => ({
    state: 1,
    due: getTimeStamp(),
    last: getTimeStamp(),
    ease: 2.3,
})

const msPerDay = 86400_000

const msToDay = (ms: number) => Math.round(ms / msPerDay)

const dayToMs = (day: number) => day * msPerDay

export function supermemo<T extends SmCard>(card: T, grade: SmGrade): T {
    const now = getTimeStamp()
    const today = thisMorningTimsStamp
    // 学习阶段
    if (card.state === 1) {

        if (grade === 3) { // 进入指数阶段
            const spanDays = msToDay(now - card.last) + 1
            const a = card.ease * 1.4
            const due = thisMorningTimsStamp + dayToMs(spanDays * a)
            console.log('review after ' + Math.round(spanDays * a) + ' days.');
            return {
                ...card,
                state: 2,
                due,
                last: now,
                ease: 2.3,
                difficulty: 1
            }
        }

        // 不熟练
        const reviewMinutes = [1, 6, 10] as const
        const repetitionMs = reviewMinutes[grade] * 60 * 1000
        const due = now + repetitionMs
        return {
            ...card,
            due
        }
    }

    // 指数阶段
    if (card.state === 2) {
        // 再复习
        if (grade === 0) {
            return {
                ...card,
                state: 3,
                due: now + 6e4 /** 1 minute */,
                last: now,
                lastSpan: msToDay(now - card.last),
            }
        }
        let ease: number, a: number

        switch (grade) {
            case 1:
                ease = card.ease - 0.15
                if (ease < 1.3)
                    ease = 1.3
                a = 1.2
                break;
            case 2:
                ease = card.ease
                a = 2
                break;
            default:
                ease = card.ease + 0.15
                if (ease > 2.5) {
                    ease = 2.5
                }
                a = ease * 0.14
                break;
        }

        const spanDays = msToDay(today - card.last)
        let delayDays = msToDay(card.due - today)
        if (delayDays < 0)
            delayDays = 0
        const repetitionDays = a * (spanDays + delayDays / card.difficulty!)
        console.log(`review after ${Math.round(repetitionDays)} later.`);
        const due = today + dayToMs(repetitionDays)
        const difficulty = 1 << (3 - grade)
        return {
            ...card,
            due,
            last: today,
            ease,
            difficulty,
        }
    }

    // 再学习阶段

    // 回到指数阶段
    if (grade === 3) {
        let ease = card.ease + 0.15
        if (ease > 2.5)
            ease = 2.5
        const a = ease * 1.4
        const spanDays = msToDay(now - card.last) + 1
        const repetitionDays = a * (spanDays + card.lastSpan! * 2)
        console.log(`review after ${Math.round(repetitionDays)} later.`);
        const due = thisMorningTimsStamp + dayToMs(repetitionDays)
        return {
            ...card,
            state: 2,
            due,
            last: now,
            ease,
            difficulty: 1
        }
    }
    // 不熟练
    const reviewMinutes = [1, 6, 10] as const
    const repetitionMs = reviewMinutes[grade] * 60 * 1000
    const due = now + repetitionMs
    return { ...card, due }
}



