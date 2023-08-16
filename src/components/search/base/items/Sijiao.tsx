import { Component, Show } from "solid-js";
import ShowTable from "./ShowTable";
import { FullData } from "./share";

import sjr from "./data/sijiao.json";
const sj: Record<string, string> = sjr;

const Sijiao: Component<{ data: FullData; input: string }> = (props) => {
  return (
    <Show when={props.input in sj}>
      <ShowTable
        data={props.data}
        zi={sj[props.input]}
        title={`四角查询 ${sj[props.input].length} 字`}
      />
    </Show>
  );
};

export default Sijiao;
