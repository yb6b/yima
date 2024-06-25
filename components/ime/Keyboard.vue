<script setup lang="ts">
const p = defineProps<{
    layout: 27 | 26
    enable: boolean
    active?: string
}>()

defineEmits<{
    click: [keyName: string]
}>()

</script>

<template>
    <!-- 候选编码 -->
    <slot name="codes"></slot>

    <div
        class="text-xl bg-neutral-50 dark:bg-neutral-900 max-w-screen-sm text-slate-900 dark:text-slate-400 select-none">
        <!-- 候选栏 -->
        <div class="flex min-h-9 h-9 text-base bg-neutral-100 dark:bg-neutral-800 pt-1 break-keep text-nowrap">
            <slot name="cadidate"></slot>
        </div>

        <!-- qwer行 -->
        <div class="flex text-center ">
            <button class="flex-1 hover:bg-slate-300 hover:dark:bg-slate-800 py-4" v-for="k in 'qwertyuiop'"
                @click="$emit('click', k)">
                {{ k }}</button>
        </div>

        <!-- asdf行，要考虑27键的布局 -->
        <div class="flex text-center " v-if="layout === 26">
            <div class="flex-5"></div>
            <button class="flex-1 hover:bg-slate-300 hover:dark:bg-slate-800 py-4" v-for="k in 'asdfghjkl'"
                @click="$emit('click', k)">
                {{ k }}</button>
            <div class="flex-5"></div>
        </div>
        <div class="flex text-center " v-else>
            <button class="flex-1 hover:bg-slate-300 hover:dark:bg-slate-800 py-4" v-for="k in 'asdfghjkl;'"
                @click="$emit('click', k)">
                {{ k }}</button>
        </div>


        <!-- zxcv行，要添加个删除按钮 -->
        <div class="flex text-center ">
            <div class="flex-1"></div>
            <button class="flex-1 hover:bg-slate-300 hover:dark:bg-slate-800 py-4" v-for="k in 'zxcvbnm'"
                @click="$emit('click', k)">
                {{ k }}</button>
            <button
                class="flex-2 text-neutral-400 hover:bg-slate-300 hover:dark:bg-slate-800 flex justify-center items-center"
                @click="$emit('click', 'bs')">
                <!-- 退格按钮 -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12" />
                </svg>
            </button>

        </div>
    </div>
</template>
