import Search from "./base/Search";
import type { FullData } from "./base/items/share";
import { scanTsv, getDataText, getJson } from "@c/utils";

import type { Component } from "solid-js";
import { Show, createResource } from "solid-js";

const CustomSearch: Component<{ ymVer: string }> = (props) => {
  const { ymVer } = props;
  const [data] = createResource(async () => getSpellingData(ymVer));
  return (
    <>
      <Show
        when={!data.loading}
        fallback={
          <div class="title has-text-grey has-text-centered is-4 my-6">
            正在加载数据……
          </div>
        }
      >
        <Search data={data()} />
      </Show>
    </>
  );
};

async function getSpellingData(ymVer: string) {
  const j = await getJson(`${ymVer}/comps.json`);
  const cf = await getDataText(`${ymVer}/chaifen.tsv`);
  const result: FullData = {};
  scanTsv(
    cf,
    ([zi, cf]) =>
      (result[zi] = {
        code: [...cf].map((c) => j[c] ?? "").join(""),
        spelling: cf,
      })
  );
  return result;
}

export default CustomSearch;
