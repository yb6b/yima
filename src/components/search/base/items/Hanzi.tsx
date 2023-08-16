import { Component, Show, createMemo } from "solid-js";
import ShowTable from "./ShowTable";
import { FullData } from "./share";

const Hanzi: Component<{ data: FullData; input: string }> = (props) => {
  const han = createMemo(() =>
    [...props.input].filter((v) => v in props.data).join("")
  );
  return (
    <Show when={han().length}>
      <ShowTable
        data={props.data}
        zi={han()}
        title={`查询 ${han().length} 字`}
      />
    </Show>
  );
};

export default Hanzi;
