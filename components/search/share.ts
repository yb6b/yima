export { type ZigenCard, type ChaiCard, fetchJsonWithCache } from '../train/share'
export let cache: Record<string, object> = {}
export type Result = [zi: string, comps: string[], keys: string[]][]