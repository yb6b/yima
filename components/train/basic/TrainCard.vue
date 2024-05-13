<script setup lang="ts">
import { shallowRef, watch, onMounted, inject } from "vue";
import { useReview } from "./useReview";
import { Card } from "../share";
import CardLayout from "../CardLayout.vue";

const p = defineProps<{
    /** 复习卡片的数据 */
    cards: readonly Card[]
    /** 复习卡片的名字, 决定localstorage里的名字 */
    id: string
}>()

const zigenFontClass = inject('font') || 'outi-yima'

const { card, restart, answer, progress, isFirst } = useReview(p.id, p.cards)

const isCorrect = shallowRef(true)
const userKeys = shallowRef('')

const focusInputElement = () => {
    const element = document.getElementById('input_el')
    element?.focus()
}

onMounted(() => {
    focusInputElement()
})

function cusRestart() {
    if (!confirm(`重置进度需要清空数据，无法撤回，您确定继续吗？`)) return;
    restart()
    focusInputElement()
}

watch(userKeys, (newKeys) => {
    // 多个编码没有打完就不提示错误
    if (newKeys.length < card.value.key!.length)
        return
    // 检查回答
    if (newKeys === card.value.key) {
        answer(true)
        isCorrect.value = true
    } else {
        answer(false)
        isCorrect.value = false
    }
    userKeys.value = ''
})

</script>

<template>
    <CardLayout :progress :max="cards.length" :isCorrect :id @restart="cusRestart">
        <div class="flex justify-around mb-8">

            <div
                :class="['text-6xl animate__animated', zigenFontClass, { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
                {{ card.name }}</div>

            <div class="flex flex-col" v-if="'rel' in card || 'kind' in card">
                <div class="flex tracking-widest flex-col opacity-70" v-if="'rel' in card">
                    <div class="text-gray-500 text-sm">
                        相关的字：</div>
                    <div>
                        {{ card.rel }}</div>
                </div>

                <div class=" tracking-widest pt-6 text-blue-600 dark:text-blue-300"
                    v-if="'kind' in card && card.kind == 'b'">
                    五个基础笔画</div>
                <div class=" tracking-widest pt-6 text-blue-600 dark:text-blue-300"
                    v-if="'kind' in card && card.kind == 'eb'">
                    25个二笔小码</div>
            </div>
        </div>
        <div class="flex justify-center p-5">
            <input id="input_el" type="text" placeholder="输入编码" v-model="userKeys"
                :class="['input w-half max-w-xs input-bordered text-center input-sm dark:bg-slate-800 bg-white', { 'input-error': !isCorrect }]" />
        </div>
        <div :class="['text-center', { 'opacity-0': !isFirst }]">答案是 <b class="font-mono">
                {{ card.key }}</b>
            <span :class="[zigenFontClass]" v-if="'comp' in card">
                （{{ card.comp }}）</span>
        </div>
    </CardLayout>
</template>
