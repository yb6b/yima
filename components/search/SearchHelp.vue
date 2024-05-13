<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-ghost btn-sm text-slate-500 font-normal" onclick="my_modal_2.showModal()">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32">
            <path fill="currentColor"
                d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12" />
            <circle cx="16" cy="23.5" r="1.5" fill="currentColor" />
            <path fill="currentColor"
                d="M17 8h-1.5a4.49 4.49 0 0 0-4.5 4.5v.5h2v-.5a2.5 2.5 0 0 1 2.5-2.5H17a2.5 2.5 0 0 1 0 5h-2v4.5h2V17a4.5 4.5 0 0 0 0-9" />
        </svg>
        查询功能说明
    </button>
    <dialog id="my_modal_2" class="modal">
        <div class="modal-box bg-slate-100 dark:bg-slate-800">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
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
                <a href="https://hanyu.baidu.com/" target="_blank" rel="noreferrer">
                    百度汉语
                </a>
                、
                <a href="https://www.zdic.net/" target="_blank" rel="noreferrer">
                    汉典网
                </a>
                。本网页会过滤码表之外的字符。
            <p>网页在第一次查询拼音、四角、笔画时，需要下载相应的数据，请稍后。</p>

            </p>
            <h4>① 查询汉字</h4>
            <p>
                输入要查询的文字（可多个汉字），程序会显示每个汉字的拆分。
            </p>
            <h4>② 拼音反查</h4>
            <p>
                输入全拼（例如：<code>hao</code>），返回所有相关汉字的拆分。
            </p>
            <h4>③ 笔画反查</h4>
            <p>
                连续输入 12345
                这五个数字，分别表示“横竖撇点折”。复杂汉字，输入完 <b>6</b>
                个笔画后，再输入汉字的 <b>最后一笔</b>。
            </p>
            <h4>④ 四角反查</h4>
            <p>
                输入
                <a href="https://baike.baidu.com/item/%E5%9B%9B%E8%A7%92%E5%8F%B7%E7%A0%81/1217626" target="_blank"
                    rel="noreferrer">
                    四角号码
                </a>{" "}
                反查相关汉字。填入4个数字或5个数字。
            </p>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button>关闭对话框</button>
        </form>
    </dialog>
</template>