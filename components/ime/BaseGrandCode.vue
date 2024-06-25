<script setup lang="ts">
import FetchInput from "./FetchInput.vue"
import { ref, computed } from "vue"
import { ImeRule } from "./share";

const props = defineProps<{
    /** 每个字的拆分数据，可以包含编码 */
    chaifenJson: string
    /** 字根数据的路径。如果省略，则chaifen里必须要有编码信息 */
    zigenJson?: string
    /** 方案的ID，用于保存localstorage */
    id?: string
    defaultPop?: boolean
}>()

const usePop = ref(props.defaultPop || false)

const rule3: ImeRule = {
    pop: 0,
    len: 3,
    cm1: ' ',
    cm2: ';',
    cm3: "'",
    keys: 26,
    autoCm: 4,
}

const rule42: ImeRule = {
    pop: 2,
    len: 3,
    cm1: ' ',
    cm2: ';',
    cm3: "'",
    keys: 26,
    autoCm: 4,
}
const rule = computed(() => usePop.value ? rule42 : rule3)

</script>

<template>
    <FetchInput :zigenJson :chaifenJson :id :rule>
        <div class="form-control">
            <label class="label cursor-pointer pt-0">
                <input type="checkbox" class="checkbox checkbox-sm" style="border: currentColor 2px solid;"
                    v-model="usePop" />
                <span>&nbsp;使用四二顶</span>
            </label>
        </div>
    </FetchInput>
</template>