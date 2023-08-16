import type { Card } from "./Danzi";
import Danzi from "./Danzi";
import { readTsvAsArray, getDataText, readTsvAsMap } from "@c/utils";
import { createSignal, createResource, Suspense, Show } from "solid-js";

async function getDanziData(url: string, ymVer: string) {
  const raw_comp_map = await getDataText(`${ymVer}/comp-map.tsv`);
  const comp_map = readTsvAsMap(raw_comp_map);

  const raw_danzi = await getDataText(url);
  return readTsvAsArray(
    raw_danzi,
    (l) =>
      ({
        zi: l[0],
        code: [...l[1]].map((c) => comp_map.get(c)).join(""),
        info: { spelling: l[1] },
      } as Card)
  );
}

export default function CustomDanzi(prop: { ymVer: string }) {
  const [chosen, setChosen] = createSignal("zi500");

  const [data] = createResource(chosen, async (v) => {
    const r = await getDanziData(`${prop.ymVer}/${v}.tsv`, prop.ymVer);
    return { cards: r, name: `V20danzi${v}` };
  });

  return (
    <>
      <div class="field columns is-centered pl-6 py-2">
        <label class="label is-small has-text-grey">
          选择训练范围
          <div class="control pt-2">
            <div class="select is-small">
              <select
                value={chosen()}
                onChange={(e) => setChosen(e.currentTarget.value)}
              >
                <option value="zi500">常用字 1~500</option>
                <option value="zi1000">常用字 500~1000</option>
                <option value="zi1500">常用字 1000~1500</option>
              </select>
            </div>
          </div>
        </label>
      </div>
      <Show
        when={!data.loading}
        fallback={
          <div class="title has-text-grey has-text-centered is-4 my-6">
            正在加载数据……
          </div>
        }
      >
        <Danzi {...data()} />
      </Show>
    </>
  );
}
