---
aside: false
---
<script setup>
import Train from "@/train/TrainHanzi.vue"
import {high} from "./high.ts"
</script>
# 易码 常用 1000~2000 字练习

<Train name="easy_code" zigenJson="/easy-code/zigen.json" chaiJson="/easy-code/chaifen.json" :high
    :range="[1000,2000]" />