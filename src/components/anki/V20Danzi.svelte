<script>
  import ZingenAnki from "./Danzi.svelte";
  import { readTsvAsArray, readTsvAsMap, getDataText } from "@c/utils";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  async function getData(url) {
    const raw_comp_map = await getDataText("/yima/V20/comp-map.tsv");
    const comp_map = readTsvAsMap(raw_comp_map);

    const raw_danzi = await getDataText(url);
    return readTsvAsArray(raw_danzi, (l) => ({
      zi: l[0],
      code: [...l[1]].map((c) => comp_map.get(c)).join(""),
      info: { spelling: l[1] },
    }));
  }

  let chosenArticle = writable("zi500");

  onMount(() => {
    chosenArticle.set(localStorage.getItem("yima_V20danzi_chosen"));
    chosenArticle.subscribe((v) =>
      localStorage.setItem("yima_V20danzi_chosen", v)
    );
  });

  const choices = [
    ["zi500", "常用汉字前500"],
    ["zi1000", "常用汉字500~1000"],
    ["zi1500", "常用汉字500~1500"],
  ];
  $: Data = getData(`/yima/V20/${$chosenArticle}.tsv`);
</script>

<div class="field columns is-centered pl-6 py-2">
  <label class="label is-small has-text-grey"
    >选择训练范围
    <div class="control pt-2">
      <div class="select is-small">
        <select bind:value={$chosenArticle}>
          {#each choices as c}
            <option value={c[0]}>{c[1]}</option>
          {/each}
        </select>
      </div>
    </div>
  </label>
</div>
{#await Data}
  <div class="title has-text-grey has-text-centered is-4 my-6">
    正在加载数据……
  </div>
{:then DATA}
  <ZingenAnki cards={DATA} name={`V20danzi${$chosenArticle}`} />
{/await}
