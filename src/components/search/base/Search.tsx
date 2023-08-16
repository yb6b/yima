import { SearchHead } from "./SearchHead";
import { throttle } from "@c/utils";
import { createSignal, createResource, Show, lazy, Suspense } from "solid-js";

import Hanzi from "./items/Hanzi";
const Pinyin = lazy(() => import("./items/Pinyin"));
const Bihua = lazy(() => import("./items/Bihua"));
const Sijiao = lazy(() => import("./items/Sijiao"));
import { FullData } from "./items/share";

export function Search(prop: { data: FullData }) {
  const [RawInput, setRawInput] = createSignal("");

  return (
    <>
      <SearchHead input={RawInput()} onchange={(i) => setRawInput(i)} />
      <div class="columns is-centered is-8 is-multiline">
        <Show
          when={/^\d+$/.test(RawInput())}
          fallback={
            <Show when={/^[a-z]+$/.test(RawInput())}>
              <Suspense fallback={<LoadingWords kind="拼音" />}>
                <Pinyin input={RawInput()} data={prop.data} />
              </Suspense>
            </Show>
          }
        >
          <Suspense fallback={<LoadingWords kind="笔画" />}>
            <Bihua input={RawInput()} data={prop.data} />
          </Suspense>
          <Suspense fallback={<LoadingWords kind="四角" />}>
            <Sijiao input={RawInput()} data={prop.data} />
          </Suspense>
        </Show>
        <Suspense fallback={<LoadingWords kind="四角" />}>
          <Hanzi input={RawInput()} data={prop.data} />
        </Suspense>
      </div>
    </>
  );
}

function LoadingWords(prop: { kind: string }) {
  return (
    <p class="title has-text-grey has-text-centered is-4 my-6">
      正在加载{prop.kind}数据……
    </p>
  );
}
