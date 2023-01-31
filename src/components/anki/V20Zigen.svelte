<script>
  import ZingenAnki from "./Zingen.svelte";

  async function getDataJson(url) {
    const d = await fetch(url);
    const j = await d.json();
    if (d.ok) {
      return j.map((e) => ({ zi: e[0], code: e[1], info: e[2] }));
    } else {
      throw new Error(j);
    }
  }
  let getZIGEN = getDataJson("/yima/V20/zigen.json");
</script>

{#await getZIGEN}
  <div class="has-text-centered">
    <div class="title is-2 my-6">正在加载数据……</div>
  </div>
{:then ZIGEN}
  <ZingenAnki cards={ZIGEN} name="V20zigen" />
{/await}
