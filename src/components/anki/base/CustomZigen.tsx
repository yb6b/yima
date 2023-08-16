import Zigen from "./Zigen";
import type { Card } from "./Zigen";
import { readTsvAsArray, getDataText } from "@c/utils";
import { Show, createSignal, onMount } from "solid-js";

async function getZigenData(url: string) {
  const raw_danzi = await getDataText(url);
  return readTsvAsArray(
    raw_danzi,
    (l) =>
      ({
        zi: l[0],
        code: l[1],
        info: l[2],
      } as Card)
  );
}

export default function CustomZigen(prop: { ymVer: string }) {
  const [srcData, setSrcData] = createSignal<Card[]>();
  onMount(() => {
    getZigenData(`${prop.ymVer}/zigen.tsv`).then((v) => setSrcData(v));
  });
  return (
    <>
      <Show
        when={srcData()}
        fallback={
          <div class="title has-text-grey has-text-centered is-4 my-6">
            正在加载数据……
          </div>
        }
      >
        <Zigen cards={srcData()} name="V20Zigen" />
      </Show>
    </>
  );
}
