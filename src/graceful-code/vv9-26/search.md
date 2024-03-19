---
aside: false
---
<script setup>
import Search from "@/search/FetchSearch.vue"
const s5 = new Set("ノㄋ丨一丶")
const dasm = (comp, compDict) => {
    const tmp = comp.map((v) => compDict[v])
    if (s5.has(tmp[0])) tmp[0] = 'j'
    if (s5.has(tmp[1])) tmp[1] = 'j'
    return tmp.join('')
}
</script>

# 逸码VV9 · 26键 拆分反查

<Search hanziJson="/vv9-26/chaifen.json" compJson="/vv9-26/zigen.json" compFont="kaiti-font" id="vv9-26" :dasm />
