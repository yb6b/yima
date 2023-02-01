<script>
  import Search from "./search.svelte";
  import { readTsv, readTsvAsMap } from "@c/utils";

  async function getDataText(url) {
    const d = await fetch(url);
    const j = await d.text();
    if (d.ok) {
      return j;
    } else {
      throw new Error(j);
    }
  }

  async function getData(url) {
    const raw_comp_map = await getDataText("/yima/V20/comp-map.tsv");
    const comp_map = readTsvAsMap(raw_comp_map);

    const raw_danzi = await getDataText(url);
    const entries = readTsv(raw_danzi, (l) => [
      l[0],
      {
        code: [...l[1]].map((c) => comp_map.get(c)).join(""),
        spelling: l[1],
      },
    ]);
    return new Map(entries)
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
