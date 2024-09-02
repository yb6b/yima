<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { HanziCard, biSearchBetween, ImeRule, searchTop } from './share'
import Keyboard from "./Keyboard.vue";
const props = defineProps<{
    id: string
    /** 每个元素，必须要填写key, 也必须按字典顺序排序 */
    data: HanziCard[]
    /** 输入法的配置 */
    rule: ImeRule
}>()

//console.log(props.data);
//#region 候选条
const candidateCodes = ref('')

const candidateHanzi = computed(() => {
    const cd = candidateCodes.value
    // 没有输入编码
    if (!cd) return [];

    const range = biSearchBetween(props.data, cd)

    // 空码
    if (!range) return [];

    return props.data.slice(range[0], range[1])
})

const candidatePageIndex = ref(0)
const candidatePage = computed(() => {
    const countsEachPage = 5
    if (candidateHanzi.value.length === 0) return [];
    const cpi = candidatePageIndex.value
    return candidateHanzi.value.slice(cpi * countsEachPage, (cpi + 1) * countsEachPage)
})

const disablePreviousPageBtn = computed(() => candidatePageIndex.value < 1)
const disableNextPageBtn = computed(() => candidatePageIndex.value > candidateHanzi.value.length / 5 - 1)
//#endregion


//#region 网页中 软键盘和文本框的交互
const text = ref('')
const textarea = ref<HTMLInputElement>()

function onClick(key: string) {
    if (key === 'bs') {
        if (candidateCodes.value)
            candidateCodes.value = candidateCodes.value.slice(0, -1)
        else
            text.value = text.value.slice(0, -1)
        return
    }
    candidateCodes.value += key
    candidatePageIndex.value = 0
}

function commit(words: string) {
    const textareaNode = textarea.value!
    const { selectionStart, selectionEnd } = textareaNode
    if (selectionStart === 0 && selectionEnd === 0) {
        text.value += words
        nextTick(() => {
            textareaNode.selectionEnd = text.value.length
        })
        return
    }
    const startPart = text.value.slice(0, selectionStart || undefined)
    const endPart = selectionEnd !== null ? text.value.slice(selectionEnd) : ''
    text.value = startPart + words + endPart
    nextTick(() => {
        textareaNode.selectionEnd = selectionStart! + words.length
    })
}

function onClickCandidate(card: HanziCard) {
    commit(card.name)
    // textarea.value?.focus()
    candidatePageIndex.value = 0
    candidateCodes.value = ''
}
//#endregion

//#region 监听 上屏 顶功

// 空码自动上屏
watch(candidateHanzi, (hz) => {
    if (hz.length > 0) return;

    // 遇见空码, 考虑顶屏
    const autoCmLen = props.rule.autoCm
    let cd = candidateCodes.value

    if (cd.length < autoCmLen + 1) return;

    let topIndex: number | null = null
    do {
        cd = cd.slice(0, -1)
        if (cd.length === 0) return;
        topIndex = searchTop(props.data, cd)
    } while (topIndex === null);

    const popCard = props.data[topIndex]
    commit(popCard.name)
    // console.log('自动上屏', popCard.name);
    candidateCodes.value = candidateCodes.value.at(-1) || ''
})

watch(candidateCodes, (cd) => {
    // 顶屏
    const popLen = props.rule.pop
    const codeLen = props.rule.len

    if (cd.length > codeLen) {
        // 延时顶功
        if (popLen) {
            const topIndex = searchTop(props.data, cd.slice(0, popLen))
            if (topIndex === null) {
                return
            }
            const popCard = props.data[topIndex]
            commit(popCard.name)
            candidateCodes.value = candidateCodes.value.slice(popLen)
        }
        // 定长
        else {
            const topIndex = searchTop(props.data, cd.slice(0, codeLen))
            if (topIndex !== null) {
                const popCard = props.data[topIndex]
                // console.log('定长上屏', popCard.name);
                commit(popCard.name)
            }
            candidateCodes.value = candidateCodes.value.slice(codeLen)
        }
    }
})
//#endregion

//#region 电脑键盘事件
const keysListened = new Set(`abcdefghijklmnopqrstuvwxyz${props.rule.keys === 27 ? ';' : ''}`)

const commitKeys = computed(() => {
    const { cm1, cm2, cm3 } = props.rule
    const result = new Map<string, number>()
    result.set(cm1, 0)
    result.set(cm2, 1)
    result.set(cm3, 2)
    for (let i = 0; i < 5; i++) {
        result.set(String(i + 1), i)
    }
    return result
})

function onKeydown(e: KeyboardEvent) {
    const { key } = e

    const cd = candidateCodes.value
    // 输入按键
    if (keysListened.has(key)) {
        e.preventDefault()
        candidateCodes.value += key
        candidatePageIndex.value = 0
        return
    }

    // 上屏键
    if (commitKeys.value.has(key)) {
        const candidateIndex = commitKeys.value.get(key)!
        if (candidateIndex < candidatePage.value.length) {
            e.preventDefault()
            commit(candidatePage.value[candidateIndex].name)
            candidateCodes.value = ''
            candidatePageIndex.value = 0
        }
        return
    }

    // 删除键
    if (key === 'Backspace' && cd) {
        e.preventDefault()
        candidateCodes.value = cd.slice(0, -1)
        return
    }

    // 清除键
    if (key === 'Escape' && cd) {
        e.preventDefault()
        candidateCodes.value = ''
        return
    }

    // 翻页键
    const cpi = candidatePageIndex.value
    if (key === '-' && cd) {
        e.preventDefault()
        if (cpi > 0)
            candidatePageIndex.value--
        return
    }
    if (key === '=' && cd) {
        e.preventDefault()
        if (cpi + 1 < candidateHanzi.value.length / 5)
            candidatePageIndex.value++
        return
    }
    //console.log(`key:${key},code:${code}`);
}

//#endregion

</script>

<template><!-- 文本输入框 -->
<div class="pt-3">
    <textarea v-model="text" ref="textarea"
        class="textarea textarea-bordered textarea-md w-full max-w-screen-sm bg-neutral-50 dark:bg-neutral-700"
        style="border-style: solid" placeholder="点击这里开始输入" @keydown="onKeydown"></textarea>
</div>

<Keyboard :layout="26" enable @click="onClick">
    <template #codes>
        <div class="h-4" v-if="candidateCodes === ''"></div>
        <div v-else class="text-xs bg-neutral-200 dark:bg-neutral-900 w-max px-2 h-4 select-none">
            {{ candidateCodes }}
        </div>
    </template>
    <template #cadidate>
        <template v-if="candidateHanzi.length === 0">
            <div class="text-sm text-slate-500 ml-6 mt-1" v-if="candidateCodes.length === 0">
                <slot>
                    <!-- 没有输入时默认显示的内容 -->
                    按下键盘或点击下方按钮
                </slot>
            </div>
            <div class="text-sm text-slate-400 dark:text-slate-500 ml-6 mt-1" v-else>空码</div>
        </template>
        <template v-else>
            <div class="flex-auto overflow-x-auto overflow-y-hidden">
                <button class="px-2 hover:bg-slate-200 dark:hover:bg-slate-900" v-for="n, i of candidatePage"
                    @click="onClickCandidate(n)">
                    <!-- 序号 -->
                    <span class="text-sm text-slate-400 dark:text-slate-500">{{ i + 1 }}.</span>
                    <!-- 词条 -->
                    <span class="select-text px-1 text-slate-900 dark:text-slate-200">
                        {{ n.name }}</span>
                    <!-- 后序编码 -->
                    <span class="text-sm text-blue-400 dark:text-blue-500 dark:opacity-70">{{
                        n.key!.slice(candidateCodes.length)
                    }}</span>
                </button>
            </div>

            <!-- 翻页按钮 -->
            <div class="float-right mx-2">
                <button :class="{ 'text-transparent': disablePreviousPageBtn }" :disabled="disablePreviousPageBtn"
                    @click="candidatePageIndex--">◂</button>
                <button :class="{ 'text-transparent': disableNextPageBtn }" :disabled="disableNextPageBtn"
                    @click="candidatePageIndex++">▸</button>
            </div>
        </template>
    </template>
</Keyboard>
</template>