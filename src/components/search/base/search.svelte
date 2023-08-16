<script>
  import Hanzi from "./hanzi.svelte";
  import Sijiao from "./sijiao.svelte";
  import Pinyin from "./Pinyin.svelte";
  import Bihua from "./Bihua.svelte";
  import SearchHelp from "./SearchHelp.svelte";
  import { throttle } from "@c/utils";

  /** @type {Map<string, {code:string,pinyin:string,spelling:string}>}*/
  export let Data;
  let rawInput = "";
  let userInput = "";

  const changeInput = throttle((rawInput) => {
    userInput = rawInput;
  }, 200);

  $: {
    changeInput(rawInput);
  }

  let needHelp = false;

</script>

<div class="columns is-centered has-text-centered">
  <div class="column is-half">
    <div class="field">
      <div class="control">
        <input
          bind:value={rawInput}
          class="input is-info  is-rounded"
          type="text"
          autocomplete="none"
          autofocus="autofocus"
          placeholder="查询的文本 / 全拼 / 四角号码 / 笔画"
        />
      </div>
      <div class="help">
        <div
          class="has-text-danger has-text-left"
          class:is-hidden={!/^[1-5]{8,}$/.test(userInput)}
        >
          笔画查询用前 6 笔和末笔
        </div>
        <SearchHelp />
      </div>
    </div>
  </div>
</div>

<div class="columns is-centered is-8 is-multiline">
  {#if /^\d+$/.test(userInput)}
    <Bihua {userInput} {Data} />
    <Sijiao {userInput} {Data} />
  {:else if /^[a-z]+$/.test(userInput)}
    <Pinyin {userInput} {Data} />
  {/if}
  <Hanzi {userInput} {Data} />
</div>
