---
aside: false
---
<script setup>
import Train from "@/train/TrainHanzi.vue"
import {high} from "./high.ts"
</script>
# 易码 常用 1000 字练习

<Train name="easy_code" zigenJson="/easy-code/zigen.json" chaiJson="/easy-code/chaifen.json" 
    :range="[0,1000]" :high/>