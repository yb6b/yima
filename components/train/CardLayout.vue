<script setup lang="ts">
import { getSchemaNameFromRoute } from "../search/share";
import { useLocalStorage } from "@vueuse/core";
import { watch, ref, nextTick } from "vue";
//@ts-expect-error
import { startConfette } from "./startConfette.js";


const p = defineProps<{
    /** 方案名称, 省略会自动推断 */
    id?: string
    /** 当前的练习进度 */
    progress: number
    /** 全部进度 */
    max: number
    /** 当前题目的回答是否正确 */
    isCorrect: boolean
}>()

defineEmits(['restart'])

const id = p.id || getSchemaNameFromRoute()
const alreadyShowConfetti = useLocalStorage(`yima_${id}-complete`, false)

// 烟花特效
const showConfetti = ref(false)
watch(() => p.progress, async (newV, oldV) => {
    if (!alreadyShowConfetti.value && newV === p.max && newV > oldV) {
        alreadyShowConfetti.value = true
        showConfetti.value = true
        await nextTick()
        startConfette()
    }
})

</script>

<template>
    <div
        :class="['md:w-2/3 w-full shadow-sm my-12 pb-24 bg-opacity-10 transition-color rounded-md', { 'bg-red-700': !isCorrect, 'bg-slate-500': isCorrect }]">
        <div class="flex justify-center mb-24">
            <progress class="progress w-full" :value="progress" :max />
        </div>
        <template v-if="showConfetti">
            <div class="p-10 text-6xl text-center font-bold text-orange-800 font-sans tracking-widest -rotate-6">
                🎉恭喜完成练习!!</div>
            <div class="flex justify-center mt-10">
                <button class="btn btn-success" @click="_ => showConfetti = false">继续练习</button>
            </div>
        </template>
        <template v-else>
            <slot />
        </template>
    </div>

    <div v-if="!showConfetti" class="text-gray-500 flex justify-between">
        <div class="text-gray-500">训练进度： {{ progress }} / {{ max }}</div>
        <button class="btn btn-ghost btn-sm font-light" @click="$emit('restart')">restart</button>
    </div>

</template>