<script setup lang="ts">
import { onMounted, shallowRef, computed } from "vue";
import Card from "./Card.vue";
import { cache, Result } from "./share";
import { withBase } from "vitepress";
const p = defineProps<{
    /** 需要请求的json的路径，注意要以 / 开头 */
    json: string,
    /** 数据的类型名字，不能用__proto__ */
    title: string,
    /** 预处理json数据 */
    prehandleJson?: (json: object) => object,
    /** 有了json数据后，生成查询的结果列表 */
    handler: (json: object, text: string) => Result
    /** 要查询的字符 */
    text: string[]
}>()

const data = shallowRef(cache[p.title])

onMounted(async () => {
    const title = p.title
    if (title in cache) return;
    try {
        const req = await fetch(withBase(p.json))
        let json = await req.json()
        if (p.prehandleJson)
            json = p.prehandleJson(json)
        cache[title] = json
        data.value = json
    } catch (error) {
        alert(`无法加载《${p.json}》文件：${error}`)
    }
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
            <Card v-for="r of result" :key="r[0]" :hanzi="r[0]" :comp="r[1]" :keys="r[2]" />
        </div>
    </template>
</template>