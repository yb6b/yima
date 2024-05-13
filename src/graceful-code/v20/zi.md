---
aside: false
---
<script setup>
    import Train from "@/train/TrainHanzi.vue"
import {high} from "../high.ts"

</script>
# 逸码V20 常用 1000 字练习

<Train name="v20_danzi" zigenJson="/v20/zigen.json" chaiJson="/v20/chaifen.json" :range="[0,1000]" :high zigenFont="kaiti-yima"/>