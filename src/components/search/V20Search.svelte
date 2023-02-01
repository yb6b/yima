<script>
  import { setContext } from "svelte";
  import Search from "./search.svelte";
  import { scanTsv, readTsvAsMap, getDataText } from "@c/utils";

  async function getData(url) {
    const rawCompTsvContent = await getDataText("/yima/V20/comp-map.tsv");
    const comp_map = readTsvAsMap(rawCompTsvContent);

    const rawDanziContent = await getDataText(url);
    const danziMap = new Map();
    scanTsv(rawDanziContent, ([zi, spelling]) => {  
      danziMap.set(zi, {
        code: [...spelling].map((c) => comp_map.get(c)).join(""),
        spelling,
      });
    });
    
    return danziMap;
  }

  let Data = getData("/yima/V20/all-zi.tsv");
</script>

{#await Data}
  <div class="title has-text-grey has-text-centered is-4 my-6">
    正在加载数据……
  </div>
{:then DATA}
  <Search Data={DATA} />
{/await}
