<script setup lang="ts">
import { provide, onMounted, shallowRef } from "vue";
import { fetchJsonWithCache, cache, type ZigenCard } from "./share";
import { getSchemaNameFromRoute } from "../search/share";
import Train from "./basic/TrainCard.vue";

const p = defineProps<{
    /** 方案的ID, 通常为方案泥 public 目录里的名称 ,省略则自动推断 */
    name?: string
    /** 字根练习的数据JSON文件的路径, 要加 /, 省略则自动根据URL推断 */
    zigenJson?: string,
    /** 字根的字体CSS名称, 默认是 欧体 */
    zigenFont?: string
    /** 是否训练小码,   
     * 要确保 zigen.json 里有 secondary 字段,   
     * 用于奕码 */
    trainSecondary?: boolean
}>()

provide("font", p.zigenFont)

const schemaName = getSchemaNameFromRoute()
const name = p.name || schemaName
const cardsName = `${name}_gen`
const realJsonName = (json: string | undefined, jsonMainName: string) => json ? json : `/${schemaName}/${jsonMainName}.json`

const cards = shallowRef<ZigenCard[]>(cache[cardsName])

onMounted(async () => {
    if (cards.value) return;
    const zgJson = await fetchJsonWithCache(realJsonName(p.zigenJson, 'zigen')) as ZigenCard[]
    if (p.trainSecondary) {
        cards.value = zgJson.filter(zg => 'secondary' in zg)
            .map(zg => ({ ...zg, key: zg.secondary! }))
    } else {
        cards.value = zgJson
    }
    cache[cardsName] = cards.value
})
</script>

<template>
    <Train v-if="cards" :id="cardsName" :cards />
    <h2 class="text-gray-700 text-center" v-else>
        下载数据中……
    </h2>
</template>