<script>
  import ZingenAnki from "./Zingen.svelte";
  import { readTsv } from "@c/utils";

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
    const raw_danzi = await getDataText(url);
    return readTsv(raw_danzi, (l) => ({
      zi: l[0],
      code: l[1],
      info: l[2],
    }));
  }

  let getZIGEN = getData("/yima/V20/zigen.tsv");
</script>

{#await getZIGEN}
  <div class="title has-text-grey has-text-centered is-4 my-6">
    正在加载数据……
  </div>
{:then ZIGEN}
  <ZingenAnki cards={ZIGEN} name="V20zigen" />
{/await}
