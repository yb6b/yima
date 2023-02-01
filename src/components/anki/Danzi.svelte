<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { Schedule } from "./schedule";

  /** @type {{zi:string,code:string,info?:unkown}[]}*/
  export let cards;

  /** @type {string}*/
  export let name;

  
  const fiveStrokes = new Set("⼀⼂⺂⼁⼃");

  let thisSchedule;
  let item = { zi: "", code: "", info: { spelling: "" } };
  let progress = 0;
  let isFirstLearn = true;
  let isCorrect = true;

  const userKeys = writable("");

  onMount(() => {
    thisSchedule = new Schedule(cards, name);
    const first = thisSchedule.first();
    item = first.item;
    isFirstLearn = first.isFirst;
    progress = thisSchedule.progress;

    userKeys.subscribe((v) => {
      if (v.length < item.code.length) return;
      checkForNextItem(v);
      userKeys.set("");
    });
  });

  function checkForNextItem(answer) {
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
            class="column m-auto is-size-1 pt-4"
            style="font-family: 'kaiti', '楷体', system-ui;"
            class:has-text-info={isCorrect}
          >{item.zi}
          </div>
          <div class="column  m-auto has-text-left">
            <div class="has-text-dark-info mb-1">
              编长：<span class="has-text-info">{item.code.length}</span>
            </div>
            <div
              class="has-text-dark-info"
              class:is-invisible={isCorrect && !isFirstLearn}
            >
              拆分：
              {#each [...item.info.spelling] as comp, i}
                <ruby class="zigenfont is-size-5" class:round-bg={fiveStrokes.has(comp)}>
                  {comp}
                  <rp>(</rp>
                  <rt class="is-family-code is-size-5 has-text-info"
                    >{item.code[i]}</rt
                  >
                  <rp>)</rp>
                </ruby>
              {/each}
            </div>
          </div>
        </div>
        <input
          bind:value={$userKeys}
          class="input is-small is-info is-rounded has-text-centered has-text-weight-bold is-family-code"
          class:is-danger={!isCorrect}
          style="max-width: 9rem;"
          type="text"
          autocomplete="none"
          placeholder="输入编码"
          autofocus="autofocus"
        />
      </div>
    </div>
  </div>
</div>
