<script setup lang="ts">
// @ts-nocheck
import ZitongLogo from "./assets/zitong.svg";
import YedianLogo from "./assets/yedian.png";
import BaiduLogo from "./assets/baidu.png";
import HandianLogo from "./assets/handian.png";
import { computed, inject } from "vue";

const p = defineProps<{
    /** 查询的汉字 */
    hanzi: string,
    /** 字根列表 */
    comp: string[],
    /** 按键列表 */
    keys: string | string[],
}>()

const zigenFont = inject('font')
const highlightStrokes = new Set(inject('high') || '')

const uriText = computed(() => encodeURIComponent(p.hanzi))
const unicode = computed(() => p.hanzi.charCodeAt(0).toString(16).toUpperCase())

</script>

<template>
    <div class="group border p-3 m-2 rounded-3xl bg-base-100 shadow-md kaiti-font text-center dark:bg-gray-800">
        <div class="text-4xl text-blue-800 dark:text-blue-400">{{ hanzi }}</div>
        <div class="text-xl mt-2">
            <ruby v-for="(c, index) in comp" :key="c">
                <span :class="['kaiti-font', zigenFont, { 'round-bg': highlightStrokes.has(c) }]">
                    {{ c }}</span>
                <rp>(</rp>
                <rt class="font-mono uppercase text-blue-400">
                    {{ keys[index] }}
                </rt>
                <rp>)</rp>
            </ruby>
        </div>
        <div class="invisible justify-center group-hover:visible">
            <div class="flex justify-around">
                <a :href="'https://zi.tools/zi/' + uriText" class="" target="_blank" rel="noreferrer" title="字统网查询">
                    <img :src=ZitongLogo alt="字统网" width="22" />
                </a>
                <a :href="'http://www.yedict.com/zscontent.asp?uni=' + unicode" class="" target="_blank"
                    rel="noreferrer" title="叶典网查询">
                    <img :src="YedianLogo" alt="叶典网" width="22" />
                </a>
                <a :href="'https://hanyu.baidu.com/s?wd=' + uriText" class="" target="_blank" rel="noreferrer"
                    title="百度汉语查询">
                    <img :src="BaiduLogo" alt="百度汉语" width="22" />
                </a>
                <a :href="'https://www.zdic.net/hans/' + uriText" class="" target="_blank" rel="noreferrer"
                    title="汉典查询">
                    <img :src="HandianLogo" alt="汉典网" width="22" />
                </a>
            </div>
        </div>
    </div>
</template>