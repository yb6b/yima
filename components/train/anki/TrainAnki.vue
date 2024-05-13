<script setup lang="ts">
import { shallowRef, watch, onMounted, inject, nextTick } from "vue";

import { useAnki } from "./useAnki";
import { Card } from "../share";
import { startConfette } from "../startConfette";


const p = defineProps<{
    /** 复习卡片的数据 */
    cards: Card[]
    /** 复习卡片的名字 */
    name: string
}>()

const fontClass = inject('font')

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
    if (newKeys.length < card.value!.key.length)
        return
    // 检查回答
    if (newKeys === card.value.key) {
        answer(isCorrect.value)
        isCorrect.value = true
    } else {
        isCorrect.value = false
    }
    // 清空输入
    userKeys.value = ''
})


// 烟花效果
const showConfetti = shallowRef(false)
watch(progress, async (newV, oldV) => {
    const newLearn = newV.meet
    const oldLearn = oldV.meet
    if (newLearn === p.cards.length && newLearn > oldLearn) {
        showConfetti.value = true
        await nextTick()
        startConfette()
    }
})

const cusRestart = () => {
    if (!confirm(`重置进度需要清空数据，无法撤回，您确定继续吗？`)) return;
    restart()
}

</script>

<template>
    <div
        :class="['md:w-2/3 w-full shadow-sm my-12 pb-24 bg-opacity-10 transition-color rounded-md', { 'bg-red-700': !isCorrect, 'bg-slate-500': isCorrect }]">
        <div class="flex justify-center mb-24">
            <progress class="progress w-full" :value="progress.familiar" :max="cards.length" />
        </div>
        <template v-if="!showConfetti">
            <div class="flex justify-around mb-8">

                <div :key="card.name"
                    :class="['text-6xl animate__animated', 'kaiti-yima', { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
                    {{ card.name }}</div>


            </div>
            <div class="flex justify-center p-5">
                <input id="input_el" type="text" placeholder="输入编码" v-model="userKeys"
                    :class="['input w-half max-w-xs input-bordered text-center input-sm dark:bg-slate-800 bg-white', { 'input-error': !isCorrect }]" />
            </div>
            <div :class="['text-center', { 'opacity-0': isCorrect }]">答案是 <b class="font-mono">{{ card.key }}</b>
                <span :class="['kaiti', fontClass]" v-if="'comp' in card">（{{ card.comp }}）</span>
            </div>
        </template>

        <template v-else>
            <div class="p-10 text-6xl text-center font-bold text-orange-800 font-sans tracking-widest -rotate-6">
                🎉恭喜过关!!</div>
            <div class="flex justify-center mt-10">
                <button class="btn btn-success" @click="_ => showConfetti = false">继续练习</button>
            </div>
        </template>

    </div>

    <div class="text-gray-500 flex justify-between">
        <div class="text-gray-500">训练进度： {{ progress.meet }} / {{ cards.length }}</div>
        <button class="btn btn-ghost btn-sm font-light" @click=" cusRestart()">restart</button>
    </div>
</template>
