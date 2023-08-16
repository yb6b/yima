export interface IFullDataItem {
  code: string;
  spelling: string;
}
export type FullData = Record<string, IFullDataItem>;

export const fiveStrokes = new Set("⼀⼂⺂⼁⼃");
