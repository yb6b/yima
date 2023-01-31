<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { Schedule } from "./schedule";

  /** @type {{zi:string,code:string,info?:unkown}[]}*/
  export let cards;

  /** @type {string}*/
  export let name;

  let thisSchedule;
  let item = { zi: "", code: "", info: "" };
  let progress = 0;
  let isFirstLearn = true;
  let isCorrect = true;
  /** 小码元 */
  const fiveStrokes = new Set("⼀⼂⺂⼁⼃");
  const userKeys = writable("");

  onMount(() => {
    thisSchedule = new Schedule(cards, name);
    const first = thisSchedule.first();
    item = first.item;
    isFirstLearn = first.isFirst;
    progress = thisSchedule.progress;

    userKeys.subscribe((v) => {
      if (v === "") return;
      checkForNextItem(v[0]);
      userKeys.set("");
    });
  });

  function checkForNextItem(answer) {
    if (answer.length !== 1) return;
    let next;
    if (answer === item.code) {
      next = thisSchedule.nextSuccess();
      isCorrect = true;
    } else {
      next = thisSchedule.nextFail();
      isCorrect = false;
    }
    item = next.item;
    isFirstLearn = next.isFirst;
    progress = thisSchedule.progress;
  }
</script>

<div class="columns is-centered">
  <div class="column is-half">
    <p class="has-text-grey">训练进度：{progress} / {cards.length}</p>
    <progress class="progress is-primary" value={progress} max={cards.length}
      >0%</progress
    >
    <div
      class="notification has-text-centered is-light columns is-centered"
      class:is-danger={!isCorrect}
    >
      <div class="column">
        <div class="columns is-mobile" style="min-height: 6rem;">
          <div
            class="column m-auto title is-size-1 pt-4 zigenfont "
            class:has-text-info={isCorrect}
          >
            {item.zi}
          </div>
          <div class="column  m-auto has-text-left">
            {#if fiveStrokes.has(item.zi)}
              <div class="has-text-dark-info mb-1">小码元的五个笔画键</div>
            {:else}
              <div class="has-text-dark-info mb-1">相关汉字：</div>
              <div class="has-text-grey is-size-7" style="letter-spacing: 1px;">
                {item.info}
              </div>
            {/if}
          </div>
        </div>
        <input
          bind:value={$userKeys}
          class="input is-small is-info is-rounded has-text-centered has-text-weight-bold is-family-code"
          class:is-danger={!isCorrect}
          style="max-width: 9rem;"
          type="text"
          autocomplete="none"
          placeholder="输入字根键"
          autofocus="autofocus"
        />

        <div
          class="has-text-grey-dark pt-4"
          class:is-invisible={!isFirstLearn && isCorrect}
        >
          答案是 <span class="is-family-code has-text-info has-text-weight-bold"
            >{item.code}</span
          >
          <div class="is-invisible is-danger" />
        </div>
      </div>
    </div>
  </div>
</div>
