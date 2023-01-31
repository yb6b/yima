<script>
  import ZingenAnki from "./DanziAnki.svelte";

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
    const comp_map = await getDataJson("/yima/V20/comp-map.json");
    const danzi = await getDataJson("/yima/V20/danzi.json");
    return danzi.map((e) => ({
      zi: e[0],
      code: [...e[1]].map((comp) => comp_map[comp]).join(""),
      info: {
        spelling: e[1],
        py: e[2],
      },
    }));
  }
  let Data = getData();
</script>

{#await Data}
  <div class="title has-text-grey has-text-centered is-2 my-6">
    正在加载数据……
  </div>
{:then DATA}
  <ZingenAnki cards={DATA} name="V20zigen" />
{/await}
