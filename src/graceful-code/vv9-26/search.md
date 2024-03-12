---
title: 逸码VV9 · 26键 拆分反查
aside: false
---
<script setup>
    import Search from "@/search/FetchSearch.vue"
</script>

<Search hanziJson="/vv9-26/chaifen.json" compJson="/vv9-26/zigen.json" compFont="kaiti-font" id="vv9-26"/>

:::details 拆分查询使用帮助
这个网页可以方便地查询逸码VV9 · 26键的拆分，可以链接到 [字统网](https://zi.tools/)、[叶典网](http://yedict.com/)、[百度汉语](https://hanyu.baidu.com/)、[汉典网](https://www.zdic.net/)。本网页会无视逸码码表以外的生僻字。
网页在第一次查询拼音、四角、笔画时，需要下载相应的数据，请稍后。

1. **查询汉字**
    - 输入要查询的文字（可多个汉字），程序会显示每个汉字的逸码的拆分。

2. **拼音反查**
    - 输入全拼（例如：`hao`），返回所有相关汉字的拆分。

3. **笔画反查**
    - 连续输入 12345 这五个数字，分别表示“横竖撇点折”。复杂汉字，输入完 **6**
个笔画后，再输入汉字的 **最后一笔**。

4. **四角反查**
    - 输入[四角号码](https://baike.baidu.com/item/%E5%9B%9B%E8%A7%92%E5%8F%B7%E7%A0%81/1217626)反查相关汉字。共4个数字或5个数字。
:::