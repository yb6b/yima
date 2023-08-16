<script>
  import { readTsvAsMap, getDataText, GlobalCache } from "@c/utils";
  import ShowTable from "./ShowTable.svelte";

  async function getData() {
    const dataUrl = "assets/pinyin.tsv";
    if (!GlobalCache.has(dataUrl)) {
      const raw = await getDataText(dataUrl);
      GlobalCache.set(dataUrl, readTsvAsMap(raw));
    }
    return GlobalCache.get(dataUrl);
  }
  
  export let userInput;

  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;

  let PinyinMap = getData();

</script>

{#await PinyinMap}
  <div class="title has-text-grey has-text-centered is-4 my-6">
    正在加载拼音数据……
  </div>
{:then DATA}
  {#if DATA.has(userInput)}
    <ShowTable
      {Data}
      someHanzi={DATA.get(userInput)}
      title={`拼音查询 ${DATA.get(userInput).length} 字`}
    />
  {/if}
{/await}
