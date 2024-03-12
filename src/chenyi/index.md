---
title: 晨逸二笔
sidebar: false
---
<script setup>
const urls = [
  [
    ["chenyi/chenyi-rime-v3.1-20210617.7z", "【最新】晨逸V3 Rime配置文件.7z"],
    ["chenyi/chenyi-rime-v2.4-20210117.7z", "晨逸V2 Rime配置文件.7z"],
  ],
  [
    ["chenyi/chenyi-mabiao.7z", "单字和词语的码表文件.7z"],
    ["chenyi/chenyi-help-v1.1.pdf", "极简的说明书.pdf"],
  ],
];
</script>

![字根图](/chenyi/kbd.png)

2码起顶的二笔顶功，最长6码；所有字词出简也出全，零声母为`z`，Z键移位到`v`，R键移位到`a`


## 单字 {#danzi}
- **字两分**：声母 + 第一拆分的首二笔或字根编码 + 第二拆分的一二三末笔
- **字不能拆分**：声母 + 汉字的首二笔或字根编码 + 末笔*4
  
## 词语 {#ciyu}
（Rime通过切换单字方案 or 词组方案；多多可通过输入oi关闭/开起，关闭时字为两码顶，开启时字为三码顶，词为四码顶）

- **两字词**：第一字前两码 + 第二字前两码 + 笔划`eruio`
- **三字词**（只收三字词）：第一字声码 + 第二字声码 + 第三字前两码 + 笔划`eruio`
- **多字词**：第一字声码 + 第二字声码 + 第三字声码 + 末字声码 + 笔划`eruio`

### 简词 {#jianci}
鉴于R键位上没有字根，且无需作为第一码出现，可通过R键来分离字词，此部分词组不影响单字，输入时，2码单字无需空格上屏，可以完美的融进原方案

- **二码开顶的词**：第一字声母 + `r` + 笔划`eruio`
- **三码开顶的词**：第一字声母 + `r` + 第二字声码 + 笔划`eruio`

## 关于单字拆分 {#chaifen}
**① 任何单字要么不能拆分，要么二分，二分原则为：**

1. 非单笔分散则拆，非单笔相连有成字则拆
2. 单笔或全单笔不拆，交断分变不拆，结构包连混乱不拆，结构笔顺不符不拆
3. 成字规定为标准8105字，非单笔锐角擦挂规定为不连，成字点接规定为不连
4. 分散优先，成字优先，取大优先  
    “相交不拆 相连可拆（日 目 白 自）有大取大”

### 散连优先顺序： {#rule}
1. 两成字分散
2. 两成字相连
3. 单成字分散
4. 无成字分散
5. 单成字相连

> 例：  
> - 旦拆日一为单笔
> - 州字为全单笔  
> - 果拆日木为交  
> - 重拆千里为断  
> - 褒拆衣保为分  
> - 肯拆止月为变  
> - 田拆口十则结构包连  
> - 拐拆扣力则结构混乱  
> - 兜去儿笔顺先白为结构笔顺不符  
> - 脊去冃最后写人为结构笔顺不符 
>  
> ***
> 
> - 衍拆彳??因彳为8105字  
> - 考拆耂丂因非单笔锐角擦挂规定为不连  
> - 可拆丁口为两成字分散  
> - 兄拆口儿为两成字相连  
> - 军拆冖军为单成字分散  
> - 沛拆氵巿为无成字分散  
> - 去拆土厶为单成字相连  
> - 綮拆??糸因分散优先  
> - 抛拆扏力因成字优先  
> - 克拆古儿因取大优先  

**② 二分元素拆分为字根的原则为：不交不断，取大优先！**

## 关于方案的学习 {#learn}
1. 熟悉二分的规则；
2. 利用跟打器，边怼边理解规则；
3. 整理出二笔字根背后的潜在字根，利用跟打器（急速、添雨），边怼边理解、记录；
4. 搞定前500个单字，速度看自己的努力，回报和付出成正比！

## 下载 {#download}
<Download :urls />