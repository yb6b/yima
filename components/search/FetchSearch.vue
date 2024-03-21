<script setup lang="ts">
import { onMounted, shallowRef, provide } from "vue";
import Search from "./Search.vue";
import { cache, ChaiCard, ZigenCard } from "./share";
import { fetchJsonWithCache } from "../train/share";

const p = defineProps<{
    /** 汉字信息的JSON文件的名字 */
    hanziJson: string
    /** 字根信息的JSON文件的名字 */
    compJson?: string
    /** 字根字体的class名字 */
    compFont?: string
    /** 方案的ID */
    id: string
    /** 自定义字根转编码时的规则 */
    dasm?: (comp: string[], compDict: Record<string, string>) => string
}>()

provide('font', p.compFont)
// 一丨丿丶乙
provide('high', p.id.includes('easy') ? '' : '⼀⼂⺂⼁⼃')
const schemaData = shallowRef<{
    compDict: Record<string, ZigenCard>,
    hanziDict: Record<string, ChaiCard>
}>()

onMounted(async () => {
    if (p.id in cache) {
        //@ts-ignore
        schemaData.value = cache[p.id]
        return
    }
    const hanziJson = await fetchJsonWithCache(p.hanziJson) as ChaiCard[]
    const compJson = p.compJson ? (await fetchJsonWithCache(p.compJson) as ZigenCard[]) : []
    const result = {
        compDict: Object.fromEntries(compJson.map(v => [v.name, v])),
        hanziDict: Object.fromEntries(hanziJson.map(v => [v.name, v])),
    }
    cache[p.id] = result
    schemaData.value = result
})
</script>

<template>
    <div class="text-gray-600" v-if="!schemaData">正在加载拆分数据……</div>
    <Search v-else :hanziDict="schemaData.hanziDict" :compDict="schemaData.compDict" :dasm />
</template>