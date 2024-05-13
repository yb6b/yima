<script setup lang="ts">
// @ts-nocheck
import ZitongLogo from "./assets/zitong.svg";
import YedianLogo from "./assets/yedian.png";
import BaiduLogo from "./assets/baidu.png";
import HandianLogo from "./assets/handian.png";
import { computed, inject } from "vue";
import { ZigenAndKeyArray } from "./share";

const p = defineProps<{
    /** 查询的汉字 */
    name: string,
    data: ZigenAndKeyArray
}>()

const zigenFont = inject('font') || 'outi-yima' as string
const highlightStrokes = inject('high') as Set<string>

const uriText = computed(() => encodeURIComponent(p.name))
const unicode = computed(() => p.name.charCodeAt(0).toString(16).toUpperCase())

</script>

<template>
    <div class="group border p-3 m-2 rounded-3xl shadow-md font-serif text-center bg-gray-100 dark:bg-slate-800">
        <div class="text-4xl text-blue-800 dark:text-blue-400">{{ name }}</div>
        <div class="text-xl mt-2">
            <ruby v-for="zigenAndKey in data" :key="zigenAndKey.zigen">
                <span :class="[zigenFont, { 'round-bg': highlightStrokes.has(zigenAndKey.zigen) }]">
                    {{ zigenAndKey.zigen }}</span>
                <rp>(</rp>
                <rt class="font-mono uppercase text-xl text-blue-400 dark:text-blue-200">
                    {{ zigenAndKey.key }}
                </rt>
                <rp>)</rp>
            </ruby>
        </div>
        <div class="opacity-0 justify-center group-hover:opacity-100 duration-300 delay-100 transition-all">
            <div class="flex justify-center dark:opacity-55 opacity-100">
                <a :href="'https://zi.tools/zi/' + uriText" target="_blank" rel="noreferrer" title="字统网查询">
                    <img :src=ZitongLogo alt="字统网" width="22" />
                </a>
                <a :href="'http://www.yedict.com/zscontent.asp?uni=' + unicode" target="_blank" rel="noreferrer"
                    title="叶典网查询">
                    <img :src="YedianLogo" alt="叶典网" width="22" />
                </a>
                <a :href="'https://hanyu.baidu.com/s?wd=' + uriText" target="_blank" rel="noreferrer" title="百度汉语查询">
                    <img :src="BaiduLogo" alt="百度汉语" width="22" />
                </a>
                <a :href="'https://www.zdic.net/hans/' + uriText" target="_blank" rel="noreferrer" title="汉典查询">
                    <img :src="HandianLogo" alt="汉典网" width="22" />
                </a>
            </div>
        </div>
    </div>
</template>