---
aside: false
---
<script setup>
import Train from "@/train/TrainHanzi.vue"
import {high} from "../high.ts"
</script>
# 逸码 VV9 · 26键 常用 1000~2000 字练习

<Train name="vv9_26_danzi" zigenJson="/vv9-26/zigen.json" chaiJson="/vv9-26/chaifen.json" zigenFont="kaiti-zigen" :range="[1000,2000]" :high/>