<script setup lang="ts">
/** 注意要 provide 字根字体的名称 */
import { shallowRef } from "vue";
import { watchThrottled, useUrlSearchParams } from "@vueuse/core";
import SearchAsync from "./SearchAsync.vue";
import SearchHanzi from "./SearchHanzi.vue";
import SearchHelp from "./SearchHelp.vue";
import type { HanziCardMap, ZigenCardMap, ReformatHandler, SearchCardsPropsArray } from "./share";
import { textToCardsProps } from "./share";
const p = defineProps<{
    /** 汉字到拆分表的映射 */
    hanziMap: HanziCardMap
    /** 字根到按键的映射，  
     * 汉字的拆分表可能含有编码信息，这时候就不需要zigenMap了 */
    zigenMap?: ZigenCardMap
    /** 重定义 字根和它编码 */
    reformat?: ReformatHandler
}>()

const customTextToCardsProps = (text: string) => textToCardsProps(text, p.hanziMap, p.zigenMap, p.reformat)

const urlSearchParams = useUrlSearchParams()
const userInput = shallowRef(urlSearchParams?.q || '')
const searchPatterns = shallowRef<string[]>([])
/** 反查的类型：字、拼音、四角(笔画)、空类型 */
const kind = shallowRef<'z' | 'p' | 'b' | ''>()

// 推断用户输入的类型
watchThrottled(userInput, () => {
    const user = userInput.value as string
    urlSearchParams.q = user
    searchPatterns.value = [...user]
    if (/^\d+/.test(user)) {
        kind.value = 'b'
    } else if (/^[a-z]+/.test(user)) {
        kind.value = 'p'
    } else if (user.length) {
        kind.value = 'z'
    } else {
        kind.value = ''
    }
}, { throttle: 300, immediate: true })


const searchHanzi = () => customTextToCardsProps(searchPatterns.value.join(''))

const handler = (json: any, text: string): SearchCardsPropsArray => (text in json) ? customTextToCardsProps(json[text] as string) : []

</script>

<template>
    <label class="input input-bordered bg-gray-100 dark:bg-slate-800 flex items-center gap-2 mt-8">
        <input type="text" class="grow" placeholder="查询的文本 / 全拼 / 四角号码 / 笔画" v-model="userInput" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
            <path fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
        </svg>
    </label>

    <div class="flex justify-center py-2">
        <SearchHelp />
    </div>

    <div v-if="kind === ''" class="opacity-40 text-center p-9 tracking-widest">从上方搜索条开始反查吧!</div>
    <SearchHanzi v-else-if="kind === 'z'" :result="searchHanzi()" />
    <SearchAsync v-else-if="kind === 'p'" title="拼音" json="/data/pinyin.json" :handler :text="searchPatterns" />
    <template v-else>
        <SearchAsync title="笔划" json="/data/bihua.json" :handler :text="searchPatterns" />
        <SearchAsync title="四角" json="/data/sijiao.json" :handler :text="searchPatterns" />
    </template>
</template>