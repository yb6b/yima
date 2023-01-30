<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { Schedule } from "./schedule";
  export let cards;
  export let name;

  let thisSchedule;
  let item = [" ", "", ""];
  let progress = 0;
  let isFirstLearn = true;
  let isCorrect = true;
  const fiveStrokes = new Set("⼀⼂⺂⼁⼃");
  const userKeys = writable("");
  let lastKey = "";

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
      lastKey = v;
    });
  });

  function checkForNextItem(answer) {
    if (answer.length !== 1) return;
    let next;
    if (answer === item[1]) {
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
    <p class="has-text-grey">训练进度：</p>
    <progress class="progress is-primary" value={progress} max={cards.length}
      >0%</progress
    >
    <div class="notification has-text-centered ">
      <div class="columns">
        <div class="column is-8">
          <div class="title is-size-1 pt-4 zigenfont has-text-info">
            {item[0]}
          </div>
          <input
            bind:value={$userKeys}
            class="input is-info is-rounded has-text-centered has-text-weight-bold is-family-code"
            style="max-width: 9rem;"
            type="text"
            autocomplete="none"
            placeholder="输入字根键"
            autofocus="autofocus"
          />
        </div>
        <div class="column m-auto has-text-left">
          {#if fiveStrokes.has(item[0])}
            <div class="has-text-dark-info mb-1">五个笔画键</div>
          {:else}
            <div class="has-text-dark-info mb-1">相关汉字：</div>
            <div class="has-text-grey is-size-7" style="letter-spacing: 1px;">
              {item[2]}
            </div>
          {/if}
        </div>
      </div>
      <div
        class="has-text-grey-dark"
        class:is-invisible={!isFirstLearn && isCorrect}
      >
        答案是 <span class="is-family-code has-text-info has-text-weight-bold"
          >{item[1]}</span
        >
        <div class="is-invisible" />
      </div>
      <div class="has-text-grey" class:is-invisible={isCorrect}>
        <span>你的回答</span>
        <span class="has-text-danger is-family-code has-text-weight-bold"
          >{lastKey}</span
        >
        <span class="has-text-danger has-text-weight-bold">错误</span>
      </div>
    </div>
  </div>
</div>
