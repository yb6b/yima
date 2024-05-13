<script setup lang="ts">
import { onMounted, shallowRef, computed } from "vue";
import Card from "./Card.vue";
import { cache, fetchJsonWithCache, SearchCardsPropsArray, prehandleJson } from "./share";
const p = defineProps<{
    /** 需要请求的json的路径，注意要以 / 开头 */
    json: string,
    /** 数据的标题，不能用__proto__ */
    title: string,
    /** 有了json数据后，生成查询的结果列表 */
    handler: (json: object, text: string) => SearchCardsPropsArray
    /** 要查询的字符 */
    text: string[]
}>()

const data = shallowRef(cache[p.title])

onMounted(async () => {
    const title = p.title
    if (title in cache) return;
    let json = await fetchJsonWithCache(p.json)
    if (title === '四角')
        json = prehandleJson(json)
    cache[title] = json
    data.value = json
})

const result = computed(() => {
    if (!data.value || !p.text) return null;
    return p.handler(data.value, p.text.join(''))
})

</script>

<template>
    <h3 v-if="!(result)" class="text-center text-gray-500 text-lg">
        正在加载{{ title }}的数据… …
    </h3>
    <template v-else-if="result.length">
        <h3 class="text-gray-500 text-center">
            {{ title }}查询
            <span class="text-sm">（共 {{ result.length }} 条）</span>
        </h3>
        <div class="flex justify-center flex-wrap my-8">
            <Card v-for="r of result" :key="r.zi" :name="r.zi" :data="r.data" />
        </div>
    </template>
</template>