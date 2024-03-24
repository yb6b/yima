<script setup lang="ts">
import { shallowRef, watch, onMounted, inject, nextTick } from "vue";

import { useReview } from "./useReview";
import { Card, startConfette } from "./share";


const p = defineProps<{
    /** 复习卡片的数据 */
    cards: Card[]
    /** 复习卡片的名字 */
    name: string
}>()

const fontClass = inject('font')
const { card, restart, answer, progress, isFirst } = useReview(p.name, p.cards)

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
    if (newKeys.length < card.value.key.length)
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


const showConfetti = shallowRef(false)
const cardLength = p.cards.length
watch(progress, async (newV, oldV) => {
    if (newV === cardLength && newV > oldV) {
        showConfetti.value = true
        await nextTick()
        startConfette()
    }
})


</script>

<template>
    <div
        :class="['md:w-2/3 w-full shadow-sm my-12 pb-24 bg-opacity-10 rounded-md transition-colors', { 'bg-red-700': !isCorrect, 'bg-slate-500': isCorrect }]">
        <div class="flex justify-center mb-24">
            <progress class="progress w-full" :value="progress" :max="cards.length" />
        </div>
        <template v-if="!showConfetti">
            <slot :card>
                <div class="flex justify-around mb-8">

                    <div :key="card.name"
                        :class="['text-6xl animate__animated', 'kaiti-font', fontClass, { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
                        {{ card.name }}</div>

                    <div class="flex flex-col" v-if="'rel' in card || 'kind' in card">

                        <div class="flex tracking-widest flex-col opacity-70" v-if="'rel' in card">

                            <div class="text-gray-500 text-sm">
                                相关的字：
                            </div>

                            <div>
                                {{ card.rel }}
                            </div>
                        </div>

                        <div class=" tracking-widest pt-6 text-blue-600 dark:text-blue-300"
                            v-if="'kind' in card && card.kind == 'b'">
                            五个基础笔画
                        </div>
                        <div class=" tracking-widest pt-6 text-blue-600 dark:text-blue-300"
                            v-if="'kind' in card && card.kind == 'eb'">
                            25个二笔小码
                        </div>
                    </div>
                </div>
                <div class="flex justify-center p-5">
                    <input id="input_el" type="text" placeholder="输入编码" v-model="userKeys"
                        :class="['input w-half max-w-xs input-bordered text-center input-sm dark:bg-slate-800 bg-white', { 'input-error': !isCorrect }]" />
                </div>
                <div :class="['text-center', { 'opacity-0': !isFirst }]">答案是 <b class="font-mono">{{ card.key
                        }}</b>
                    <span :class="['kaiti-font', fontClass]" v-if="'comp' in card">（{{ card.comp }}）</span>
                </div>
            </slot>
        </template>


        <template v-else>
            <div class="p-10 text-6xl text-center font-bold text-orange-800 font-sans tracking-widest -rotate-6">
                🎉恭喜完成练习!!</div>
            <div class="flex justify-center mt-10">
                <button class="btn btn-success" @click="_ => showConfetti = false">继续练习</button>
            </div>
        </template>

    </div>

    <div class="text-gray-500 flex justify-between">
        <div>训练进度：{{ progress }} / {{ cards.length }}</div>
        <button class="btn btn-ghost btn-sm font-light" @click="_ => cusRestart()">restart</button>
    </div>
</template>
