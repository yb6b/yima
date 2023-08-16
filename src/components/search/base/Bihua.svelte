<script>
  import { readTsvAsMap, getDataText, GlobalCache } from "@c/utils";
  import ShowTable from "./ShowTable.svelte";

  async function getData() {
    const dataUrl = "assets/bihua.tsv";
    if (!GlobalCache.has(dataUrl)) {
      const raw = await getDataText(dataUrl);
      GlobalCache.set(dataUrl, readTsvAsMap(raw));
    }
    return GlobalCache.get(dataUrl);
  }

  export let userInput;

  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;

  let BihuaMap = getData();
</script>

{#await BihuaMap}
  <div class="title has-text-grey has-text-centered is-4 my-6">
    正在加载笔画数据……
  </div>
{:then DATA}
  {#if DATA.has(userInput)}
    <ShowTable
      {Data}
      someHanzi={DATA.get(userInput)}
      title={`笔画查询 ${DATA.get(userInput).length} 字`}
    />
  {/if}
{/await}
