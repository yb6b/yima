<script>
  import { scanTsv, getDataText, GlobalCache } from "@c/utils";
  import ShowTable from "./ShowTable.svelte";

  async function getData() {
    const dataUrl = "/yima/V20/sijiao.tsv";
    if (!GlobalCache.has(dataUrl)) {
      const raw = await getDataText(dataUrl);

      const MapHas4Numbers = new Map();
      scanTsv(raw, (l) => {
        MapHas4Numbers.set(l[0], l[1]);
        const Num4 = l[0].substring(0, 4);
        const old = MapHas4Numbers.get(Num4);
        MapHas4Numbers.set(Num4, (old ?? "") + l[1]);
      });

      GlobalCache.set(dataUrl, MapHas4Numbers);
    }
    return GlobalCache.get(dataUrl);
  }

  export let userInput;

  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;

  let sijiaoMap = getData();

  $: isSijiao = /^\d{4,5}$/.test(userInput);
</script>

{#if isSijiao}
  {#await sijiaoMap}
    <div class="title has-text-grey has-text-centered is-4 my-6">
      正在加载四角号码数据……
    </div>
  {:then DATA}
    {#if DATA.has(userInput)}
      <ShowTable
        {Data}
        someHanzi={DATA.get(userInput)}
        title={`四角号码查询`}
      />
    {/if}
  {/await}
{/if}
