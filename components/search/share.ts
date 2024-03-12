export let cache: Record<string, object> = {}
export type Result = (readonly [zi: string, comps: string[], keys: string[]])[]