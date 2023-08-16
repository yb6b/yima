import { createSignal, createEffect, For } from "solid-js";
import { Schedule } from "./schedule";
import { fiveStrokes } from "./Zigen";

export interface Card {
  zi: string;
  code: string;
  info?: {
    spelling: string;
  };
}

export default function Danzi(prop: { cards: Card[]; name: string }) {
  if (!prop.cards) {
    console.log(prop);
    return <></>;
  }
  let thisSchedule: Schedule<Card>;
  const [card, setCard] = createSignal<Card>({
    zi: "",
    code: "",
    info: {
      spelling: "",
    },
  });
  const [progress, setProgress] = createSignal(0);
  const [isFirstLearn, setIsFirstLearn] = createSignal(true);
  const [isCorrect, setIsCorrect] = createSignal(true);
  const [UserKeys, setUserKeys] = createSignal("");

  createEffect(() => {
    thisSchedule = new Schedule(prop.cards, prop.name);
    const first = thisSchedule.first();
    setCard(first.item);
    setIsFirstLearn(first.isFirst);
    setProgress(thisSchedule.progress);
  });

  createEffect(() => {
    const value = UserKeys();
    if (value.length < card().code.length) return;
    checkNextItem(value);
    setUserKeys("");
  });

  function checkNextItem(answer: string) {
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
            训练进度：{progress()} / {prop.cards.length}
          </p>
          <progress
            class="progress is-primary"
            value={progress()}
            max={prop.cards.length}
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
                  class="column m-auto is-size-1 pt-4"
                  style="font-family: 'kaiti', '楷体', system-ui;"
                  classList={{ "has-text-info": isCorrect() }}
                >
                  {card().zi}
                </div>
                <div class="column  m-auto has-text-left">
                  <div class="has-text-dark-info mb-1">
                    码长：
                    <span class="has-text-info">{card().code.length}</span>
                  </div>
                  <div
                    class="has-text-dark-info"
                    classList={{
                      "is-invisible": isCorrect() && !isFirstLearn(),
                    }}
                  >
                    拆分：
                    <For each={[...card().info.spelling]}>
                      {(comp, index) => (
                        <ruby
                          class="zigenfont is-size-5"
                          classList={{ "round-bg": fiveStrokes.has(comp) }}
                        >
                          {comp}
                          <rp>(</rp>
                          <rt class="is-family-code is-size-5 has-text-info">
                            {card().code[index()]}
                          </rt>
                          <rp>)</rp>
                        </ruby>
                      )}
                    </For>
                  </div>
                </div>
              </div>
              <input
                type="text"
                value={UserKeys()}
                oninput={(e) => setUserKeys(e.currentTarget.value)}
                class="input is-small is-info is-rounded has-text-centered has-text-weight-bold is-family-code"
                classList={{ "is-danger": !isCorrect() }}
                style="max-width: 9rem;"
                autocomplete="none"
                placeholder="输入编码"
                autofocus
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
