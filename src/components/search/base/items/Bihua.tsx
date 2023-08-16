import { Component, Show } from "solid-js";
import ShowTable from "./ShowTable";
import { FullData } from "./share";

import bhr from "./data/bihua.json";
const bh: Record<string, string> = bhr;

const Bihua: Component<{ data: FullData; input: string }> = (props) => {
  return (
    <Show when={props.input in bh}>
      <ShowTable
        data={props.data}
        zi={bh[props.input]}
        title={`笔画查询 ${bh[props.input].length} 字`}
      />
    </Show>
  );
};

export default Bihua;
