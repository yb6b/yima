<script setup lang="ts">
import { shallowRef, watch, onMounted, inject, nextTick } from "vue";

import { useAnki } from "./useAnki";
import type { Card } from "../share";

import CardLayout from "../CardLayout.vue";

const p = defineProps<{
    /** 复习卡片的数据, 可能是片段 */
    cards: Card[]
    /** 复习卡片的名字 */
    name: string
}>()

const zigenFontClass = inject('font') || 'outi-yima'
const highlightStrokes = inject('high') as Set<string>

const {
    progress,
    card,
    answer,
    restart,
} = useAnki(p.cards, p.name)


const isCorrect = shallowRef(true)
const userKeys = shallowRef('')

// 聚焦输入框
onMounted(() => {
    const element = document.getElementById('input_el')
    element?.focus()
})

watch(userKeys, (newKeys) => {
    // 多个编码没有打完就不提示错误
    if (newKeys.length < card.value!.key!.length)
        return
    // 检查回答
    if (newKeys === card.value!.key) {
        answer(isCorrect.value)
        isCorrect.value = true
    } else {
        isCorrect.value = false
    }
    // 清空输入
    userKeys.value = ''
})

const cusRestart = () => {
    if (!confirm(`重置进度需要清空数据，无法撤回，您确定继续吗？`)) return;
    restart()
}

</script>

<template>
<CardLayout :progress="progress.familiar" :max="cards.length" :isCorrect :id="name" @restart="cusRestart">
    <div class="flex justify-around mb-8">
        <div :key="card!.name"
            :class="['text-6xl animate__animated', 'kaiti-zigen', { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
            {{ card!.name }}</div>

    </div>
    <div class="flex justify-center p-5">
        <input id="input_el" type="text" placeholder="输入编码" v-model="userKeys"
            :class="['input w-half max-w-xs input-bordered text-center input-sm dark:bg-slate-800 bg-white', { 'input-error': !isCorrect }]" />
    </div>
    <div :class="['text-center', { 'opacity-0': isCorrect }]">答案是
        <b class="font-mono">{{ card!.key }}</b>
        <span :class="[zigenFontClass, 'tracking-widest opacity-80']" v-if="'comp' in card!">
            (<span v-for="zg of card.comp" :class="{ 'round-bg': highlightStrokes.has(zg) }">{{ zg }}</span>)</span>
    </div>
</CardLayout>
</template>
