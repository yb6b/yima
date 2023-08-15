<script>
  import SearchWebs from "./SearchWebs.svelte";
  export let someHanzi;

  
  const fiveStrokes = new Set("⼀⼂⺂⼁⼃");
  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;

  export let title;
</script>

<div class="columns is-multiline">
  <div class="is-size-4 column is-full has-text-grey has-text-centered">
    {title}
  </div>
  <div class="column">
    <div class="table-container" >
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>汉字</th>
            <th>拆分</th>
            <th>查询</th>
          </tr>
        </thead>
        <tbody>
          {#each [...someHanzi] as zi}
            <tr>
              <td
                class="subtitle is-4 has-text-link"
                style="font-family: 'kaiti', '楷体', system-ui;">{zi}</td
              >
              <td>
                <div>
                  {#each [...Data.get(zi).spelling] as comp, i}
                    <ruby class="zigenfont is-size-5" class:round-bg={fiveStrokes.has(comp)} >
                      {comp}
                      <rp>(</rp>
                      <rt
                        class="is-family-code is-size-6 has-text-info has-text-weight-bold is-uppercase" 
                        >{Data.get(zi).code[i]}</rt
                      >
                      <rp>)</rp>
                    </ruby>
                  {/each}
                </div>
              </td>
              <td>
                <SearchWebs text={zi} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
