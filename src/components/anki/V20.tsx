import CustomZigen from "./base/CustomZigen";
import CustomDanzi from "./base/CustomDanzi";

import { Component } from "solid-js";

export const V20Zigen: Component<{}> = (props) => {
  return <CustomZigen ymVer="V20" />;
};

export const V20Danzi: Component<{}> = (props) => {
  return <CustomDanzi ymVer="V20" />;
};
