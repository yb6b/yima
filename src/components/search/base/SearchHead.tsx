import { createSignal } from "solid-js";

export function SearchHead(prop: {
  input: string;
  onchange: (newinput: string) => void;
}) {
  return (
    <div class="columns is-centered has-text-centered">
      <div class="column is-half">
        <div class="field">
          <div class="control">
            <input
              value={prop.input}
              oninput={(e) => {
                prop.onchange(e.currentTarget.value);
              }}
              class="input is-primary is-rounded"
              type="text"
              autocomplete="none"
              autofocus
              placeholder="查询的文本 / 全拼 / 四角号码 / 笔画"
            />
          </div>
          <div class="help">
            <div
              class="has-text-danger has-text-left"
              classList={{ "is-hidden": !/^[1-5]{8,}$/.test(prop.input) }}
            >
              笔画查询用前 6 笔和末笔
            </div>
            <SearchHelp />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchHelp() {
  const [needHelp, setNeedHelp] = createSignal(false);
  return (
    <>
      <div class="modal" classList={{ "is-active": needHelp() }}>
        <div
          class="modal-background"
          onclick={() => {
            setNeedHelp(false);
          }}
        />
        <div class="modal-content" style="max-width: 20rem;">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">逸码拆分查询帮助</div>
            </div>
            <div class="card-content has-text-left">
              <p>
                这个网页可以方便地查询逸码的拆分，可以链接到
                <a href="https://zi.tools/" target="_blank" rel="noreferrer">
                  字统网
                </a>
                、
                <a href="http://yedict.com/" target="_blank" rel="noreferrer">
                  叶典网
                </a>
                、
                <a
                  href="https://hanyu.baidu.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  百度汉语
                </a>
                、
                <a
                  href="https://www.zdic.net/"
                  target="_blank"
                  rel="noreferrer"
                >
                  汉典网
                </a>
                。本网页会无视逸码码表以外的生僻字。
              </p>
              <h4>查询汉字</h4>
              <p>
                输入要查询的文字（可多个汉字），程序会显示每个汉字的逸码的拆分。
              </p>
              <h4>拼音反查</h4>
              <p>
                输入全拼（例如：<code>hao</code>），返回所有相关汉字的拆分。
              </p>
              <h4>笔画反查</h4>
              <p>
                连续输入 12345
                这五个数字，分别表示“横竖撇点折”。复杂汉字，输入完 <b>6</b>
                个笔画后，再输入汉字的 <b>最后一笔</b>。
              </p>
              <h4>四角反查</h4>z
              <p>
                输入
                <a
                  href="https://baike.baidu.com/item/%E5%9B%9B%E8%A7%92%E5%8F%B7%E7%A0%81/1217626"
                  target="_blank"
                  rel="noreferrer"
                >
                  四角号码
                </a>{" "}
                反查相关汉字。共4个数字或5个数字。
              </p>
              <h4>性能</h4>
              <p>
                网页在第一次查询拼音、四角、笔画时，需要下载相应的数据，请稍后。
              </p>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <button
                  class="button is-info is-inverted is-fullwidth"
                  aria-label="关闭帮助弹窗"
                  onclick={() => {
                    setNeedHelp(false);
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        class="button is-info is-inverted"
        aria-label="帮助弹窗"
        onclick={() => {
          setNeedHelp(true);
        }}
      >
        帮助
      </button>
    </>
  );
}
