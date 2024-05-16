export * from '../train/share'
import { HanziCard, ZigenCardMap, HanziCardMap, fetchJsonWithCache } from "../train/share";
import { useRoute } from "vitepress";

// 用于缓存四角号码数据
export let cache: Record<string, any> = {}

export interface ZigenAndKey {
    zigen: string
    key: string
}
/** 在Card.vue里使用 */
export type ZigenAndKeyArray = ReadonlyArray<ZigenAndKey>
export type ReformatHandler = (hanziInfo: HanziCard, zigenMap: ZigenCardMap) => ZigenAndKeyArray

/** 按照汉字信息里的拆分, 从字根map里找相应的大码, 作为编码,  
 * 要确保 hanzi 信息里有拆分数据
  */
const easyReformatHandler: ReformatHandler = (hanziInfo, zigenMap) => [...hanziInfo.comp!].map(
    zg => ({
        zigen: zg,
        key: zigenMap.get(zg)!.key
    })
)

/** 汉字信息里有key数据, 直接把字根和key封装起来, 
 * 如果编码比拆分长, 则把超出部分的编码设为空 */
const readKeyReformatHandler: ReformatHandler = (hanziInfo, _) => {
    const zigens = [...hanziInfo.comp!]
    return [...hanziInfo.key!].map((key, i) => ({
        key,
        zigen: zigens[i] || '',
    }))
}

export interface SearchCardsProps {
    zi: string
    data: ZigenAndKeyArray
}

export type SearchCardsPropsArray = ReadonlyArray<SearchCardsProps>

/** 
 * 用户输入一串字符串, 转换为一组 Card.vue用的数据
 */
export function textToCardsProps(text: string, hanziMap: HanziCardMap, zigenMap?: ZigenCardMap, reformat?: ReformatHandler): SearchCardsPropsArray {
    // 没有字根数据，只可能是汉字数据里有keys
    if (!zigenMap) {
        const fmt = reformat || readKeyReformatHandler
        return [...text]
            .filter(zi => hanziMap.has(zi))
            .map(zi => ({
                zi,
                //@ts-expect-error
                data: fmt(hanziMap.get(zi)!, undefined)
            }))
    }
    const result: SearchCardsProps[] = []
    for (const zi of text) {
        // 过滤没有字根数据的汉字
        if (!hanziMap.has(zi)) continue
        const hanziData = hanziMap.get(zi)!
        // 自定义的匹配方式, 只有奕码需要
        if (reformat) {
            result.push({ zi, data: reformat(hanziData, zigenMap) })
            continue
        }
        // 默认的匹配方式
        if ('key' in hanziData)
            result.push({ zi, data: readKeyReformatHandler(hanziData, zigenMap) })
        else
            result.push({ zi, data: easyReformatHandler(hanziData, zigenMap) })
    }
    return result
}

/** 四角号码用的JSON文件处理
 * 补齐4码
 */
export function prehandleJson(json: object) {
    const result: Record<string, any> = {}
    for (const [k, v] of Object.entries(json)) {
        result[k] = v
        if (k.length > 4) {
            const tempKey = k.slice(0, 4)
            if (tempKey in result) {
                result[tempKey] += v
            } else {
                result[tempKey] = v
            }
        }
    }
    return result
}

/** 从vitepress的路由里推断当前使用的方案英文名称 */
export function getSchemaNameFromRoute() {
    const route = useRoute()
    const routeSplit = route.path.split('/')
    if (routeSplit[1] === 'yima') return routeSplit[2]
    return routeSplit[1]
}

/** 请求汉字、字根的JSON文件 如果没有填JSON名,会根据URl推断一个 */
export async function useFetchJson(json: string | undefined, schemaName: string, jsonMainName: string) {
    if (json)
        return await fetchJsonWithCache(json)
    return await fetchJsonWithCache(`/${schemaName}/${jsonMainName}.json`) as object[]
}