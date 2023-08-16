import type { Card } from "./base/Danzi";
import Danzi from "./base/Danzi";
import { getDataText, readTsvAsArray, getJson } from "@c/utils";
import { createSignal, createResource, Show } from "solid-js";

type RSS = Record<string, string>;

async function getDanziData(url: string, ymVer: string) {
  const comps = (await getJson(`${ymVer}/comps.json`)) as RSS;

  const danzi = await getDataText(url);
  return readTsvAsArray(
    danzi,
    ([zi, chaifen]) =>
      ({
        zi,
        code: [...chaifen].map((c) => comps[c] ?? "").join(""),
        info: {
          spelling: chaifen,
        },
      } as Card)
  );
}

export default function CustomDanzi(prop: { ymVer: string }) {
  const { ymVer } = prop;
  const [chosen, setChosen] = createSignal("zi500");

  const [data] = createResource(chosen, async (v) => {
    const r = await getDanziData(`${ymVer}/${v}.tsv`, ymVer);
    return { cards: r, name: `${ymVer}${v}` };
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
