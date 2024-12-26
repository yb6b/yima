import { ReformatHandler, ZigenAndKey } from "@/search/share";

export const reformat: ReformatHandler = (hanziInfo, zigenMap) => {
    const comp = [...hanziInfo.comp!]
    const compLength = comp.length
    const bm = hanziInfo.key!
    const bmLength = bm.length

    const result: ZigenAndKey[] = []
    for (let i = 0; i < compLength; i++) {
        const zigen = comp[i];
        result.push({
            zigen,
            key: bm[i]
        })
    }

    // 最后一个字根的键位可能包含多个字符
    if (bmLength > compLength) {
        const lastData = result[compLength - 1]
        // 剩余的字符添加到最后一个字根的键位中
        for (let i = compLength; i < bmLength; i++) {
            lastData.key += bm[i]
        }
    }

    return result
}