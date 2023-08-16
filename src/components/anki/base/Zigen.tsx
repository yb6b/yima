import { createSignal, onMount, createEffect, Show } from "solid-js";
import { Schedule } from "./schedule";

export const fiveStrokes = new Set("⼀⼂⺂⼁⼃");

export interface Card {
  zi: string;
  code: string;
  info?: string;
}

export default function Zigen(prop: { cards: Card[]; name: string }) {
  const { cards, name } = prop;
  let thisSchedule: Schedule<Card>;
  const [card, setCard] = createSignal<Card>({
    zi: "",
    code: "",
    info: "",
  });
  const [progress, setProgress] = createSignal(0);
  const [isFirstLearn, setIsFirstLearn] = createSignal(true);
  const [isCorrect, setIsCorrect] = createSignal(true);
  const [UserKeys, setUserKeys] = createSignal("");

  onMount(() => {
    thisSchedule = new Schedule(cards, name);
    const first = thisSchedule.first();

    setCard(first.item);
    setIsFirstLearn(first.isFirst);
    setProgress(thisSchedule.progress);

    createEffect(() => {
      const value = UserKeys();
      if (value === "") return;
      checkNextItem(value[0]);
      setUserKeys("");
    });
  });

  function checkNextItem(answer: string) {
    if (answer.length !== 1) return;
    let next: { item: Card; isFirst: boolean };
    if (answer === card().code) {
      next = thisSchedule.nextSuccess();
      setIsCorrect(true);
    } else {
      next = thisSchedule.nextFail();
      setIsCorrect(false);
    }
    setCard(next.item);
    setIsFirstLearn(next.isFirst);
    setProgress(thisSchedule.progress);
  }

  return (
    <>
      <div class="columns is-centered">
        <div class="column is-half">
          <p class="has-text-grey">
            训练进度：{progress()} / {cards.length}
          </p>
          <progress
            class="progress is-primary"
            value={progress()}
            max={cards.length}
          >
            0%
          </progress>
          <div
            class="notification has-text-centered is-light columns is-centered"
            classList={{ "is-danger": !isCorrect() }}
          >
            <div class="column">
              <div class="columns is-mobile" style="min-height: 6rem;">
                <div
                  class="column m-auto title is-size-1 pt-4 zigenfont "
                  classList={{ "has-text-info": isCorrect() }}
                >
                  {card().zi}
                </div>
                <div class="column  m-auto has-text-left">
                  <Show
                    when={fiveStrokes.has(card().zi)}
                    fallback={
                      <>
                        <div class="has-text-dark-info mb-1">相关汉字：</div>
                        <div
                          class="has-text-grey is-size-7"
                          style="letter-spacing: 1px;"
                        >
                          {card().info}
                        </div>
                      </>
                    }
                  >
                    <div class="has-text-dark-info mb-1">
                      小码元的五个笔画键
                    </div>
                  </Show>
                </div>
              </div>
              <input
                type="text"
                value={UserKeys()}
                onInput={(e) => setUserKeys(e.currentTarget.value)}
                class="input is-small is-info is-rounded has-text-centered has-text-weight-bold is-family-code"
                classList={{ "is-danger": !isCorrect() }}
                style="max-width: 9rem;"
                autocomplete="none"
                placeholder="输入字根键"
                autofocus
              />

              <div
                class="has-text-grey-dark pt-4"
                classList={{ "is-invisible": !isFirstLearn() && isCorrect() }}
              >
                答案是{" "}
                <span class="is-family-code has-text-info has-text-weight-bold">
                  {card().code}
                </span>
                <div class="is-invisible is-danger" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
