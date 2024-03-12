<script setup lang="ts">
import { provide, onMounted, shallowRef } from "vue";
import { cache, type Card } from "./share";
import { withBase } from 'vitepress'
import Train from "./Train.vue";

const p = defineProps<{
    /** 卡片组的名字 */
    name: string,
    /** 字根练习的数据JSON文件的路径, 要加 / */
    zigenJson: string,
    /** 单字练习的数据的JSON文件的路径，如果不提供参数，则视为 */
    chaiJson?: string
    /** 字根的字体CSS名称 */
    fontClass?: string
}>()

provide("font", p.fontClass)

const cards = shallowRef<Card[]>()

onMounted(async () => {
    const cardsName = p.name
    if (cardsName in cache)
        return cards.value = cache[cardsName]

    try {
        const req = await fetch(withBase(p.zigenJson))
        const json = await req.json()
        cache[cardsName] = json
        return cards.value = json
    } catch (error) {
        alert(`无法下载${p.zigenJson}文件：${error}`)
    }
})
</script>

<template>
    <Train v-if="cards" :name :cards />
    <h2 class="text-gray-700" v-else>
        下载数据中……
    </h2>
</template>