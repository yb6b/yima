<script setup lang="ts">
import { shallowRef, watch, onMounted, inject } from "vue";
import { useReview } from "./useReview";
import { Card, ZigenCard } from "../share";
import CardLayout from "../CardLayout.vue";

const p = defineProps<{
    /** 复习卡片的数据 */
    cards: readonly Card[]
    /** 复习卡片的名字, 决定localstorage里的名字 */
    id: string
}>()

const zigenFontClass = inject('font') || 'outi-yima'
const hasClass = inject<boolean>('hasClass') || false
let cards = structuredClone(p.cards)
if (hasClass) {
    // 归类只有字根卡片会用到，所以可以强行转换类型

    // ① 先提取出所有无归并的卡片
    const mainCards: ZigenCard[] = []
    const mainCardsMap = new Map<string, ZigenCard>()
    const extraCards: ZigenCard[] = []
    for (let i = 0; i < cards.length; i++) {
        const c = cards[i] as unknown as ZigenCard;
        c._idx = i
        if (!c.class || (c.class === c.name)) {
            mainCards.push(c)
            mainCardsMap.set(c.name, c)
        } else {
            extraCards.push(c)
        }
    }

    // ② 再把有归并的卡片并入 _classZigen 属性上去
    let hasError = false
    for (const c of extraCards) {
        const mainCard = mainCardsMap.get(c.class!)
        if (!mainCard) {
            console.error(`字根${c.name}的归类是「${c.class}」，但没有找到这个字根`);
            // 容错：仍旧把这个卡片加入
            mainCards.push(c)
            mainCardsMap.set(c.name, c)
            hasError = true
            continue;
        }
        if (mainCard._classZigen) {
            mainCard._classZigen.push(c)
        } else {
            mainCard._classZigen = [c]
        }
    }
    if (hasError) {
        mainCards.sort((a, b) => a._idx! - b._idx!)
    }
    cards = mainCards
}


const { card, restart, answer, progress, isFirst } = useReview(p.id, cards)

const isCorrect = shallowRef(true)
const userKeys = shallowRef('')


const focusInputElement = () => {
    const element = document.getElementById('input_el')
    element?.focus()
}

onMounted(() => {
    // 处理归类
    if (hasClass) {

    }
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
        <div class="flex justify-center items-center mb-8 ">
            <div
                 :class="['text-6xl mr-12 align-middle animate__animated', zigenFontClass, { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
                {{ card.name }}</div>

            <div class="flex flex-col" v-if="'rel' in card || 'kind' in card">
                <div class="flex tracking-widest flex-col opacity-80" v-if="'rel' in card">
                    <div class="text-gray-500 text-sm">
                        相关的字：</div>
                    <div>
                        {{ card.rel }}</div>
                    <template v-if="card._classZigen">
                        <div class="text-gray-500 text-sm mt-4 mb-2">
                            相似字根：</div>
                        <div v-for="c in card._classZigen" class="my-1">
                            <span :class="['opacity-100 text-xl mr-2', zigenFontClass, { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
                                {{ c.name }}
                            </span>
                            <span class="text-sm">{{ c.rel }}</span>

                        </div>
                    </template>
                </div>

                <div class=" tracking-widest pt-6 text-blue-600 dark:text-blue-300" v-if="'kind' in card && card.kind == 'b'">
                    五个基础笔画</div>
                <div class=" tracking-widest pt-6 text-blue-600 dark:text-blue-300" v-if="'kind' in card && card.kind == 'eb'">
                    25个二笔小码</div>
            </div>
        </div>
        <div class="flex justify-center p-5">
            <input id="input_el" type="text" placeholder="输入编码" v-model="userKeys" :class="['input w-half max-w-xs input-bordered text-center input-sm dark:bg-slate-800 bg-white', { 'input-error': !isCorrect }]" />
        </div>
        <div :class="['text-center', { 'opacity-0': !isFirst }]">答案是 <b class="font-mono">
                {{ card.key }}</b>
            <span :class="[zigenFontClass]" v-if="'comp' in card">
                （{{ card.comp }}）</span>
        </div>
    </CardLayout>
</template>
