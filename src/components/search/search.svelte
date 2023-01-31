<script>
  import SearchCard from "./SearchCard.svelte";
  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;
  let userInput = "";
  console.log(Data);
</script>

<div class="columns is-centered has-text-centered">
  <div class="column is-half">
    <input
      bind:value={userInput}
      class="input is-primary is-rounded"
      type="text"
      autocomplete="none"
      autofocus="autofocus"
      placeholder="输入需要查询的文本"
    />
  </div>
</div>
<div class="columns is-multiline is-8">
  {#each [...userInput] as zi}
    {#if Data.has(zi)}
      <div class="column is-half m-auto" style="max-width: 24rem;">
        <SearchCard
          text={zi}
          code={Data.get(zi).code}
          pinyin={Data.get(zi).pinyin}
          spelling={Data.get(zi).spelling}
        />
      </div>
    {/if}
  {/each}
</div>
