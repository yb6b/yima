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

const rule: ImeRule = {
    pop: 0,
    len: 6,
    cm1: ' ',
    cm2: ';',
    cm3: "'",
    keys: 26,
    autoCm: 2,
}

</script>

<template>
    <FetchInput :zigenJson :chaifenJson :id :rule>
    </FetchInput>
</template>