import { withBase } from "vitepress";

export const cache: Record<string, any> = {}
const fetchCache: Record<string, any> = {}


export interface ZigenCard {
    /** 字根用字 */
    name: string;
    /** 所在按键（大码） */
    key: string;
    /** 相关的汉字 */
    rel: string;
    /** 类型，易码用，笔划、二笔 */
    kind?: 'b' | 'eb'
    /** 小码所在键，奕码用 */
    secondary?: string
    /** 字根归类：它与哪个字根相似 */
    class?: string
    /** 内部属性，字根归类用的类似字根，程序会修改这个属性，json里不要填写 */
    _classZigen?: ZigenCard[]
    /** 内部属性 */
    _idx?: number
}

/** 汉字信息 */
export interface HanziCard {
    /** 汉字 */
    name: string,
    /** 编码 */
    key?: string,
    /** 拆分 */
    comp?: string,
}

export type Card = ZigenCard | HanziCard

/** 汉字 - 汉字信息的Map数据 */
export type HanziCardMap = Map<string, HanziCard>

/** 字根 - 字根信息的Map数据 */
export type ZigenCardMap = Map<string, ZigenCard>

export async function fetchJsonWithCache(url: string) {
    if (url in fetchCache)
        return fetchCache[url]

    let urlFixed = url
    if (url[0] === '/') {
        urlFixed = withBase(url)
    }

    try {
        const req = await fetch(urlFixed)
        const json = await req.json()
        fetchCache[url] = json
        return json

    } catch (error) {
        if (error instanceof Error)
            alert(`无法下载或解析《${url}》文件：${error.cause}`)
        throw error
    }
}