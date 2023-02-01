<script>
  import SearchCard from "./SearchCard.svelte";
  import SearchWeb from "./searWebs.svelte";

  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;
  let userInput = "";
  $: hanzi = [...userInput].filter((v) => Data.has(v));
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
<div class="columns is-centered is-8">
  {#if hanzi?.length}
    <div class="table-container">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>汉字</th>
            <th>拆分</th>
            <th>查询</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>汉字</th>
            <th>拆分</th>
            <th>查询</th>
          </tr>
        </tfoot>
        <tbody>
          {#each hanzi as zi}
            <tr>
              <td class="subtitle is-4 has-text-link" style="font-family: 'kaiti', '楷体', system-ui;">{zi}</td>
              <td>
                <div>
                  {#each [...Data.get(zi).spelling] as comp, i}
                    <ruby class="zigenfont is-size-5">
                      {comp}
                      <rp>(</rp>
                      <rt
                        class="is-family-code is-size-6 has-text-info has-text-weight-bold"
                        >{Data.get(zi).code[i]}</rt
                      >
                      <rp>)</rp>
                    </ruby>
                  {/each}
                </div>
              </td>
        
              <td>
                <SearchWeb text={zi} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
