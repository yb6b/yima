<script setup lang="ts">
/** 单字练习 使用SM2算法 */
import { shallowRef, onMounted, provide } from "vue";
import { HanziCard, ZigenCard, cache, fetchJsonWithCache } from "./share";
import Train from "./anki/TrainAnki.vue";

const p = defineProps<{
    /** 方案的ID, 通常为方案的 public 目录里的名称 ,省略则自动推断 */
    name: string
    /** 单字练习的数据的JSON文件的路径，要加 / */
    chaiJson: string
    /** 练习的范围，从第几条到第几条，不填则是全部 */
    range?: [start: number, end: number]
    /** 字根练习的数据JSON文件的路径，  
     * 如果不填, 那就从chaifen.json里读key字段
     * 如果chaiJson里只有拆分没有编码，则必须提供字根数据  */
    zigenJson?: string,
    /** 字根的字体CSS名称 */
    zigenFont?: string
    /** 需要高亮显示的字根 */
    high?: string
}>()

provide("font", p.zigenFont)

provide('high', new Set(p.high))

let cardsName = p.name + '_single'

const range = p.range
if (range) {
    cardsName += `_${range[0]}_${range[1]}`
}

const cards = shallowRef<HanziCard[]>(cache[cardsName])

onMounted(async () => {
    /** 初始化时候，要处理请求json数据、截断数据、补齐编码字段 */
    if (cards.value) return;

    let chaifenCards: HanziCard[] = await fetchJsonWithCache(p.chaiJson)
    if (range) {
        chaifenCards = chaifenCards.slice(range[0], range[1])
    }

    // 填上编码信息
    if (p.zigenJson) {
        const zigenCard = await fetchJsonWithCache(p.zigenJson) as ZigenCard[]
        const zigenKeyMap = new Map(zigenCard.map(v => [v.name, v.key]))

        for (const e of chaifenCards) {
            if (e.key) continue
            if (!e.comp) {
                const msg = `${p.zigenJson} 文件里 ${e} 没有comp字段也没有key字段`
                alert(msg)
                throw new Error(msg)
            }
            e.key = [...e.comp].map(gen => zigenKeyMap.get(gen) || '').join('')
        }
    }

    cache[cardsName] = chaifenCards

    return cards.value = chaifenCards
})
</script>

<template>
    <Train v-if="cards" :name="cardsName" :cards />
    <h2 class="text-gray-700" v-else>
        下载数据中……
    </h2>
</template>