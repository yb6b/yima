import { withBase } from "vitepress";
export const cache = {}

export interface ZigenCard {
    name: string;
    key: string;
    rel: string;
    kind?: 'stroke'
}

export interface ChaiCard {
    name: string,
    /** 拆分 */
    comp?: string,
    /** 编码 */
    key?: string,
}

export type Card = ZigenCard | ChaiCard

export async function fetchJsonWithCache(url: string) {
    if (url in cache)
        return cache[url]

    let urlFixed = url
    if (url[0] === '/') {
        urlFixed = withBase(url)
    }

    try {
        const req = await fetch(urlFixed)
        const json = await req.json()
        cache[url] = json
        return json
        
    } catch (error) {
        if (error instanceof Error)
            alert(`无法下载或解析《${url}》文件：${error.cause}`)
        throw error
    }
}