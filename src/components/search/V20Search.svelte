<script>
  import Search from "./search.svelte";

  async function getDataJson(url) {
    const d = await fetch(url);
    const j = await d.json();
    if (d.ok) {
      return j;
    } else {
      throw new Error(j);
    }
  }

  async function getData() {
    const rawTable = await getDataJson("/yima/V20/all-zi.json");
    const result = new Map();
    for (const e of rawTable) {
        result.set(e[0],{
            spelling:e[1],
            code:e[2],
            pinyin:e[3],
        })
    }
    return result;
  }
  let Data = getData();
</script>

{#await Data}
  <div class="title has-text-grey has-text-centered is-4 my-6">
    正在加载数据……
  </div>
{:then DATA}
  <Search Data={DATA} />
{/await}
