<script setup lang="ts">
import { onMounted, shallowRef, provide } from "vue";
import Search from "./Search.vue";
import { cache, HanziCard, HanziCardMap, ZigenCard, ZigenCardMap, fetchJsonWithCache, getSchemaNameFromRoute, ReformatHandler, useFetchJson } from "./share";

const p = defineProps<{
    /**
     * 存有汉字信息的JSON文件的路径
     * 如果不填，则从URL里推断，chaifen.json
     */
    chaifenJson?: string
    /** 
     * 存有字根信息的JSON文件的路径
     * 如果不填，则从URL里推断，zigen.json
     */
    zigenJson?: string
    /** 如果没有zigen.json文件，设为true
     * 奕码和逸码vv9是直接从chaifen.json里获取编码的, 不需要zigen.json.
     */
    noZigenJson?: boolean
    /** 字根字体的class名字 */
    zigenFont?: string
    /** 方案的ID, 通常为方案泥 public 目录里的名称 ,省略则自动推断 */
    id?: string
    /** 需要高亮显示的字根 */
    high?: string
    /** 重定义 字根和它编码 */
    reformat?: ReformatHandler
}>()

// 字根的字体默认是楷体
provide('font', p.zigenFont ?? 'kaiti')

// 高亮的字根，默认为空的Set
provide('high', new Set(p.high))
// 一丨丿丶乙
//p.id.includes('easy') ? '' : '⼀⼂⺂⼁⼃')


const schemaData = shallowRef<{
    zg?: ZigenCardMap,
    cf: HanziCardMap,
}>()

const schemaName = p.id || getSchemaNameFromRoute()
const realJsonName = (json: string | undefined, jsonMainName: string) => json ? json : `/${schemaName}/${jsonMainName}.json`
const makeMapFromArray = <T extends { name: string }>(arr: T[]) => new Map(arr.map(v => [v.name, v]))

onMounted(async () => {
    let id = schemaName

    if (id in cache) {
        //@ts-ignore
        schemaData.value = cache[id]
        return
    }
    const chaifenJson: HanziCard[] = await fetchJsonWithCache(realJsonName(p.chaifenJson, 'chaifen'))
    const result = {
        cf: makeMapFromArray(chaifenJson),
        zg: p.noZigenJson ? undefined : makeMapFromArray(await fetchJsonWithCache(realJsonName(p.zigenJson, 'zigen')) as ZigenCard[])
    }

    cache[id] = result
    schemaData.value = result
})
</script>

<template>
    <div class="text-gray-600" v-if="!schemaData">正在加载拆分数据……</div>
    <Search v-else :hanziMap="schemaData.cf" :zigenMap="schemaData.zg" :reformat />
</template>