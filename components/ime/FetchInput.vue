<script setup lang="ts">
import * as utils from './share'
import { onMounted, shallowRef } from "vue";
import InputMethod from './InputMethod.vue'
/** 在线输入法，只打单字 */
const p = defineProps<{
    /** 每个字的拆分数据，可以包含编码 */
    chaifenJson: string
    /** 字根数据的路径。如果省略，则chaifen里必须要有编码信息 */
    zigenJson?: string
    /** 方案的ID，用于保存localstorage */
    id?: string
    /** 方案的配置 */
    rule: utils.ImeRule
}>()

const id = p.id || p.chaifenJson
const schemaData = shallowRef<utils.HanziCard[]>()

onMounted(async () => {
    if (id in utils.cache) {
        schemaData.value = utils.cache[id]
        return
    }

    const chaifenJson: utils.HanziCard[] = await utils.fetchJsonWithCache(p.chaifenJson)
    if (p.zigenJson) {
        const zigenJson: utils.ZigenCard[] = await utils.fetchJsonWithCache(p.zigenJson)

        const zigenMap = utils.makeMapFromArray(zigenJson)
        for (const cf of chaifenJson) {
            if (cf.key) continue
            cf.key = [...cf.comp!].map(zg => zigenMap.get(zg)!.key).join('')
        }
    }
    chaifenJson.sort(utils.sortFunc)
    schemaData.value = chaifenJson
    utils.cache[id] = chaifenJson
})

</script>

<template>
    <div class="text-gray-600 text-center" v-if="!schemaData">加载中……</div>
    <InputMethod v-else :id :rule :data="schemaData">
        <slot></slot>
    </InputMethod>
</template>
