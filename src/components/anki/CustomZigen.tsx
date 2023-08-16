import Zigen from "./base/Zigen";
import type { Card } from "./base/Zigen";
import { readTsvAsArray, getDataText } from "@c/utils";
import { Show, createResource } from "solid-js";

export default function CustomZigen(prop: { ymVer: string }) {
  const { ymVer } = prop;
  const [data] = createResource(async () => getZigenData(`${ymVer}/zigen.tsv`));

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
        <Zigen cards={data()} name={`${ymVer}zigen`} />
      </Show>
    </>
  );
}

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
