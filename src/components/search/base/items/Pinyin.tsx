import { Component, Show } from "solid-js";
import ShowTable from "./ShowTable";
import { FullData } from "./share";

import pyr from "./data/pinyin.json";
const py: Record<string, string> = pyr;

const Pinyin: Component<{ data: FullData; input: string }> = (props) => {
  return (
    <Show when={props.input in py}>
      <ShowTable
        data={props.data}
        zi={py[props.input]}
        title={`拼音查询 ${py[props.input].length} 字`}
      />
    </Show>
  );
};

export default Pinyin;
