import ZitongLogo from "./assets/zitong.svg";
import YedianLogo from "./assets/yedian.png";
import BaiduLogo from "./assets/baidu.png";
import HandianLogo from "./assets/handian.png";
import { createMemo, For } from "solid-js";
import type { Component } from "solid-js";
import { fiveStrokes, FullData } from "./share";

const ShowTable: Component<{
  zi: string;
  title: string;
  data: FullData;
}> = (props) => {
  return (
    <div class="columns is-multiline">
      <div class="is-size-4 column is-full has-text-grey has-text-centered">
        {props.title}
      </div>
      <div class="column">
        <div class="table-container">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>汉字</th>
                <th>拆分</th>
                <th>查询</th>
              </tr>
            </thead>
            <tbody>
              <For each={[...props.zi]}>
                {(z) => (
                  <tr>
                    <td
                      class="subtitle is-4 has-text-link"
                      style="font-family: 'kaiti', '楷体', system-ui;"
                    >
                      {z}
                    </td>
                    <td>
                      <div>
                        <For each={[...props.data[z].spelling]}>
                          {(comp, i) => (
                            <ruby
                              class="zigenfont is-size-5"
                              classList={{ "round-bg": fiveStrokes.has(comp) }}
                            >
                              {comp}
                              <rp>(</rp>
                              <rt class="is-family-code is-size-6 has-text-info has-text-weight-bold is-uppercase">
                                {props.data[z].code[i()]}
                              </rt>
                              <rp>)</rp>
                            </ruby>
                          )}
                        </For>
                      </div>
                    </td>
                    <td>
                      <SearchWebs text={z} />
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function SearchWebs(prop: { text: string }) {
  const uriText = createMemo(() => encodeURIComponent(prop.text));
  const unicode = createMemo(() =>
    prop.text.charCodeAt(0).toString(16).toUpperCase()
  );
  return (
    <>
      <a
        href={"https://zi.tools/zi/" + uriText()}
        class="icon"
        target="_blank"
        rel="noreferrer"
        title="字统网查询"
      >
        <img src={ZitongLogo} alt="字统网" />
      </a>
      <a
        href={"http://www.yedict.com/zscontent.asp?uni=" + unicode()}
        class="icon"
        target="_blank"
        rel="noreferrer"
        title="叶典网查询"
      >
        <img src={YedianLogo} alt="叶典网" />
      </a>
      <a
        href={"https://hanyu.baidu.com/s?wd=" + uriText()}
        class="icon"
        target="_blank"
        rel="noreferrer"
        title="百度汉语查询"
      >
        <img src={BaiduLogo} alt="百度汉语" />
      </a>
      <a
        href={"https://www.zdic.net/hans/" + uriText()}
        class="icon"
        target="_blank"
        rel="noreferrer"
        title="汉典查询"
      >
        <img src={HandianLogo} alt="汉典网" />
      </a>
    </>
  );
}

export default ShowTable;
