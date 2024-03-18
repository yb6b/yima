<script setup lang="ts">
import { shallowRef, watch, onMounted, inject, nextTick } from "vue";
import { Schedule } from "./schedule";
import { Card } from "./share";
import confetti from "canvas-confetti";

const p = defineProps<{
    /** 复习卡片的数据 */
    cards: Card[]
    /** 复习卡片的名字 */
    name: string
}>()

const fontClass = inject('font')

let thisSchedule: Schedule<Card>;
const card = shallowRef<Card>({
    name: '',
    key: '',
})
const progress = shallowRef(0)
const isFirstLearn = shallowRef(true)
const isCorrect = shallowRef(true)
const userKeys = shallowRef('')

onMounted(() => {
    /** 生成复习计划时，需要读取localStorage，所以要放到onMounted里执行 */
    thisSchedule = new Schedule(p.cards, p.name)
    const first = thisSchedule.first()
    card.value = first.item
    isFirstLearn.value = first.isFirst
    progress.value = thisSchedule.progress
    const element = document.getElementById('input_el')
    element?.focus()
})

watch(userKeys, (newKeys) => {
    // 多个编码没有打完就不提示错误
    if (newKeys.length < card.value.key.length)
        return
    // 检查回答
    checkNextItem(newKeys)
    userKeys.value = ''
})

function checkNextItem(answer: string) {
    let next: { item: Card; isFirst: boolean };
    if (answer === card.value.key) {
        next = thisSchedule.nextSuccess();
        isCorrect.value = true
    } else {
        next = thisSchedule.nextFail();
        isCorrect.value = false
    }
    card.value = next.item
    isFirstLearn.value = next.isFirst
    progress.value = thisSchedule.progress
}

const showConfetti = shallowRef(false)
watch(progress, (newV, oldV) => {
    if (newV === p.cards.length && newV > oldV)
        showConfetti.value = true
})
watch(showConfetti, async (v) => {
    if (!v) return;
    await nextTick();

    var duration = 5000;
    var animationEnd = Date.now() + duration;
    var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 30,
        shapes: [
            confetti.shapeFromText({ text: '快', scalar: 7 }),
            confetti.shapeFromText({ text: '强', scalar: 8 }),
            confetti.shapeFromText({ text: '😆', scalar: 4 }),
            confetti.shapeFromText({ text: '🎉', scalar: 5 }),
            confetti.shapeFromText({ text: '👍', scalar: 5 }),
        ],
        scalar: 2,
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        confetti({
            ...defaults, shapes: ['circle'],
            particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
})

</script>

<template>
    <div
        :class="['md:w-2/3 w-full shadow-sm my-12 pb-24 bg-opacity-10 rounded-md', { 'bg-red-700': !isCorrect, 'bg-slate-500': isCorrect }]">
        <div class="flex justify-center mb-24">
            <progress class="progress w-full" :value="progress" :max="cards.length" />
        </div>
        <template v-if="!showConfetti">
            <div class="flex justify-around mb-8">

                <div class="w-40 flex justify-center h-28 p-5 overflow-hidden">
                    <Transition enterActiveClass="animate__animated animate__bounceInLeft"
                        leaveActiveClass="animate__animated animate__bounceOutRight" mode="out-in">
                        <div :key="card.name"
                            :class="['text-6xl animate__animated', 'kaiti-font', fontClass, { 'text-red-400': !isCorrect, 'animate__headShake': !isCorrect }]">
                            {{ card.name }}</div>
                    </Transition>
                </div>

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
                <input id="input_el" type="text" placeholder="输入字根编码" v-model="userKeys"
                    :class="['input w-half max-w-xs input-bordered text-center input-sm dark:bg-slate-800 bg-white', { 'input-error': !isCorrect }]" />
            </div>
            <div :class="['text-center', { 'opacity-0': !isFirstLearn }]">答案是 <b class="font-mono">{{ card.key }}</b>
                <span :class="[fontClass]" v-if="'comp' in card">（{{ card.comp }}）</span>
            </div>
        </template>
        <template v-else>
            <div class="p-10 text-6xl text-center font-bold text-orange-800 font-sans tracking-widest -rotate-6">
                🎉恭喜完成练习!!</div>
            <div class="flex justify-center mt-10">
                <button class="btn btn-success" @click="_ => showConfetti = false">继续练习</button>
            </div>
        </template>

    </div>

    <div class="text-gray-500">训练进度：{{ progress }} / {{ cards.length }}</div>
</template>

<style>
.right-enter-active .left-enter-active {
    animation: bounceInLeft 1s;
}

.right-leave-active {
    animation: bounceOutRight 1s;
}

.left-leave-active {
    animation: bounceOutLeft 1s;
}
</style>