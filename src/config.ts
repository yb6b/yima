export const SITE_TITLE = "逸码网";
export const SITE_DESCRIPTION = "乱序纯形二码顶！";

interface Tab {
  label: string;
  href: string;
}

const fullTabBar: Tab[] = [
  {
    label: "说明书",
    href: "",
  },
  {
    label: "下载",
    href: "download",
  },
  {
    label: "字根练习",
    href: "zigen",
  },
  {
    label: "单字练习",
    href: "danzi",
  },
  {
    label: "反查",
    href: "search",
  },
];

const narrowTabBar: Tab[] = [
  {
    label: "说明书",
    href: "",
  },
  {
    label: "下载",
    href: "download",
  },
];

export const YmDesc: Record<
  string,
  { title: string; desc: string; tabs: Tab[] }
> = {
  V20: {
    title: "逸码 V20",
    desc: "大字根、字根归类、优化常用字",
    tabs: fullTabBar,
  },
  "VV9-26": {
    title: "逸码 VV9 · 26键",
    desc: "字根归类、口口吃肉、橘姐专享",
    tabs: fullTabBar,
  },
  "VV9-27": {
    title: "逸码 VV9 · 27键",
    desc: "手感极佳",
    tabs: narrowTabBar,
  },
  "V20-27": {
    title: "逸码 V20 · 27键",
    desc: "实验版本",
    tabs: narrowTabBar,
  },
  VV4: {
    title: "逸码 VV4",
    desc: "梦开始的地方",
    tabs: narrowTabBar,
  },
  chenyi: {
    title: "晨逸二笔",
    desc: "乱序两笔二码顶",
    tabs: narrowTabBar,
  },
};

export function findHrefByLabel(tabs: Tab[], href: string) {
  const found = tabs.find((v) => v.href === href);
  return found ? found.label : "";
}
