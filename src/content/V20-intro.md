---
title: "逸码官网"
description: "首页介绍"
updatedDate: "2023-1-14"
heroImage: "/yi-cursive.svg"
---
# 逸码 V20 说明书
## 1. 概述
### 1.1 逸码输入法概述
逸码是一款连续二码纯形顶功输入法。顶功输入法是 2005 年，由戴石麟大师发明的一种新型输入法。区别与传统定长输入法，逸码除了 21 个空格上屏的一简字以外，其余字都不需要使用空格上屏。

逸码输入法由小泥巴设计于 2018 年构想及设计，根据不同特点分为多个版本。本文以 26 码纯单字版本为例。

### 1.2 逸码输入法特点
由于省略了空格，顶功输入法极大地增强了单字效率。举例：“欢迎使用逸码输入法。”各字编码如下：
```
汉字：欢   迎   使   用   逸   码   输   入   法。
逸码：fao  pwr  jl  to   wxr  dau  yqi dor  nw.
```
在输入这句话时，只需要连续输入 `faopwrjltowxrdauyqidornw.` 即可，中间是不需要加空格上屏。由于省略了空格，降低按键次数，从而提高了打字速度。

### 1.3 逸码输入法数据
- **单字评测数据**
  
  加权键长 2.40，左右互击 69.44%

  [![科学形码测评结果](/yima/V20/measure.webp)](/yima/V20/measure.webp)

- **赛文码长数据**

  |文章|类型|字数|码长|
  |:-:|:-:|--:|:-:|
  | 三国演义 | 中国古典小说 | 60,3220 | 2.3901|
  | 西游记 | 中国古典小说 | 71,5951 | 2.2958|
  | 天工开物 | 古代文学 | 14,1972 | 2.3811|
  | 雪中悍刀行 | 网络小说 | 465,9433 | 2.3390|
  | 凡人修仙传| 网络小说 | 719,1205 | 2.2465|
  | 走到人生边上 | 当代散文 |8,1859 | 2.1919|
  |杀死一只知更鸟| 外国文学 | 19,3526 | 2.1864|

## 2 规则
### 2.1 依据规范
- 字形依据：宋体，天珩全字库（[TH-Tshyn](http://cheonhyeong.com/Simplified/download.html)）
- 收字范围：点儿词库、《[通用规范汉字表](http://www.moe.gov.cn/jyb_sjzl/ziliao/A19/201306/t20130601_186002.html)》
- 笔顺依据:《[GF 0023 — 2020 通用规范汉字笔顺规范](http://www.moe.gov.cn/jyb_sjzl/ziliao/A19/202103/t20210318_520473.html)》
- 字频依据：单单字频 20190101
- 基本笔形编码：
  -  大码元集合笔形编码为 中日韩统一表意文字 （<span class="zigenfont">一丨丿丶乛</span>）
  -  小码元集合笔形编码为 康熙部首（<span class="zigenfont">⼀⼁⼃⼂⺂</span>）

### 2.2 拆字规则

1. **从上到下**：一个字从上到下拆分部件。
**释义**：这里定义的是所取字根在字中所处的位置。
**示例**：【算】拆分为 <span class="zigenfont">⺮目廾</span>。
2. **从左到右**：一个字从左到右拆分部件。
**释义**：这里定义的是所取字根在字中所处的位置
**示例**：【作】拆分为 <span class="zigenfont">亻乍</span>。
3. **取大优先**.：优先取大字根。（怎么定义大）
**释义**：拆分出来的字根要尽可能大，即“再添一个笔画，便不能构成笔画更多的字根”为限度。
**示例**：【章】拆分为 <span class="zigenfont">音十</span>。
4. **相交不拆**：字根如与其它笔画相交，则不取
**释义**：相交不拆，字根如果与其它笔画相交，则此字根即被破坏而不可取。

### 2.3 编码规则
逸码码元分为两个码元集合：

* 小码元集合：`eruio` (<span class="zigenfont">一丨丿丶⺂</span>)
* 大码元集合：余下 21 个字母（其余字根）

逸码有三条编码规则：

* 首码为大码元集合中的码元（以下简称大码元）
* 不存在连续三个大码元
* 小集合后不存在大码元

### 2.3 取码规则
* 第一码使用大码元内字根拆分。
* 第二码优先使用大码元内字根拆分。若第一码已经拆分完汉字，则使用小码元从头取码。
* 第三码开始使用小码元字根拆分，若已经拆分完汉字，则重复使用最后一码补码。
* 不限制码长。

**示例**
* **作**：编码是 `jz`，分别指：
  1. `j` <span class="zigenfont">亻</span>
  2. `z` <span class="zigenfont">乍 </span>
* **忽**：编码是 `jlru`，分别指：
  1. `j` <span class="zigenfont">勿</span>
  2. `l` <span class="zigenfont">心</span>
  3. `r` <span class="zigenfont">丶</span>（心的第一笔）
  4. `u` <span class="zigenfont">乚</span>（心的第二笔）
* **持**：编码是 `glei`，分别指：
  1. `g` <span class="zigenfont">扌</span>
  2. `l` <span class="zigenfont">土</span>
  3. `e` <span class="zigenfont">一</span>（剩余部分第一笔）
  4. `i` <span class="zigenfont">丨</span>（剩余部分第二笔）
* **一**：编码是 `je`，分别指：
  1. `j` <span class="zigenfont">一</span> （一画字根）
  2. `e` <span class="zigenfont">一</span> （一字第一笔）
* **丫**：编码是 `wjiii`，分别指：
  1. `w` <span class="zigenfont">丷</span>
  2. `j` <span class="zigenfont">丨</span>
  3. `i` <span class="zigenfont">丨</span>（重复最后一笔）
  4. `i` <span class="zigenfont">丨</span>（重复最后一笔）
  5. `i` <span class="zigenfont">丨</span>（重复最后一笔）

### 2.3 简码规则
- 简码设计规则：依据字频。
- 出简不出全：当一个字可以使用简码无重码时则不输入再继续输入剩余部件编码。

  **示例**：
  - 【能】拆分为 <span class="zigenfont">厶⺝匕</span>，但是输入 <span class="zigenfont">厶月</span> 编码 `ch` 时已无重码，所以不继续输入。
  - 【熊】拆分为 <span class="zigenfont">厶⺝匕灬</span>，但是输入 <span class="zigenfont">厶月</span> 编码 `ch` 时与【能】重码，所以继续输入。

## 3. 部件字根
字根总共 470 个，归类后 318 个字根。

[![逸码字根图](/yima/V20/V20-kbd.webp)](/yima/V20/V20-kbd.webp)

<a class="button is-small is-light" href="/yima/V20/V20-kbd.pdf" target="_blank" download="逸码V20字根图矢量图.pdf">下载PDF高清字根图</a>

## 4. 参考
- [09 五笔第一代说明书 2018 版](http://gaokuan.ysepan.com/)
- [顶功·集萃](https://ding.tansongchen.com/)
- 灵形速影教程
- 小拆五笔教程试读版
- [小鹤入门](https://help.flypy.com/#/)
- 小兮码帮助文件
- 星空一笔输入法教程
- 星空键道音笔版 6.0 教程
- [哲豆音形说明文件](http://zzdzzd.ysepan.com/)