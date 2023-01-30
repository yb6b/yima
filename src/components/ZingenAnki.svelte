<script>
  import { onMount } from "svelte";
  import { Schedule } from "./schedule";
  export let cards;
  export let name;

  let thisSchedule;
  let item = [" ", "", ""];
  let progress = 0;
  let userKeys = "";
  let isFirstLearn = true;
  let isCorrect = true;
  const fiveStrokes = new Set("⼀⼂⺂⼁⼃");
  onMount(() => {
    thisSchedule = new Schedule(cards, name);
    const first = thisSchedule.first();
    item = first.item;
    isFirstLearn = first.isFirst;
    progress = thisSchedule.progress;
  });

  function handleUserKeyDown(e) {
    if (e.keyCode < 65 || e.keyCode > 90) return;
    const answer = e.key.toLowerCase();
    let next;
    if (answer === item[1]) {
      next = thisSchedule.nextSuccess();
      isCorrect = true;
    } else {
      next = thisSchedule.nextFail();
      isCorrect = false;
    }
    userKeys = answer;
    item = next.item;
    isFirstLearn = next.isFirst;
    progress = thisSchedule.progress;
  }
</script>

<svelte:body on:keydown={handleUserKeyDown} />
<div class="columns is-centered">
  <div class="column is-half">
    <p class="has-text-grey">训练进度：</p>
    <progress class="progress is-primary" value={progress} max={cards.length}
      >0%</progress
    >
    <div class="notification has-text-centered ">
      <div class="columns">
        <div class="column is-8">
          <div class="has-text-grey-light">请敲击字根所在按键</div>

          <div class="title is-size-1 pt-4 zigenfont has-text-info">
            {item[0]}
          </div>
        </div>
        {#if fiveStrokes.has(item[0])}
          <div class="column">
            <div class="has-text-dark-info mb-1">该字是小码元的五个笔画键</div>
          </div>
        {:else}
          <div class="column has-text-left">
            <div class="has-text-dark-info mb-1">相关汉字：</div>
            <div class="has-text-grey is-size-7">{item[2]}</div>
          </div>
        {/if}
      </div>
      <div class="has-text-grey-dark" class:is-invisible={!isFirstLearn && isCorrect}>
        答案是 <span class="is-family-code has-text-info has-text-weight-bold"
          >{item[1]}</span
        >
        <div class="is-invisible" />
      </div>
      <div class="has-text-grey" class:is-invisible={isCorrect}>
        <span>你的回答</span>
        <span
          class="has-text-danger has-text-weight-bold is-family-code"
          id="yr">{userKeys}</span
        >
        <span class="has-text-danger has-text-weight-bold">错误</span>
      </div>
    </div>
    <!-- <div class="buttons has-addons is-centered">
        <button class="button  is-inverted is-small">网页键盘</button>     
        <button class="button  is-inverted is-small">字根图</button>     
    </div> -->
  </div>
</div>
