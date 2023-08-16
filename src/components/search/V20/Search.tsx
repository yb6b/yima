import { Search } from "../base/Search";
import type { FullData } from "../base/items/share";

import V20Chaifen from "./Chaifen.json";
import V20CompsMap from "./Comps.json";

function initDanziData() {
  let result: FullData = {};
  for (const i in V20Chaifen) {
    const cf = V20Chaifen[i];
    result[i] = {
      code: [...cf].map((c) => V20CompsMap[c] ?? "").join(""),
      spelling: cf,
    };
  }
  return result;
}

export default function V20Search() {
  const data = initDanziData();
  return <Search data={data} />;
}
