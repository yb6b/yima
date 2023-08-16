export function readTsvAsArray<T>(
  content: string,
  mapFn: (line: string[]) => T
) {
  const result: T[] = [];
  scanTsv(content, (line) => {
    result.push(mapFn(line));
  });
  return result;
}

export function readTsvAsMap(content: string) {
  const result: Map<string, string> = new Map();
  scanTsv(content, (line) => {
    result.set(line[0], line[1]);
  });
  return result;
}

export function scanTsv(content: string, foreachFn: (line: string[]) => void) {
  let position = 0;
  while (true) {
    const returnIndex = content.indexOf("\n", position);
    if (returnIndex === -1) break;
    const line = content.substring(position, returnIndex).split("\t");
    foreachFn(line);
    position = returnIndex + 1;
  }
  if (position < content.length - 1) {
    foreachFn(content.substring(position).split("\t"));
  }
}

export async function getJson<T = Record<string, string>>(
  url: string
): Promise<T> {
  if (url.startsWith("/")) url = url.substring(1);
  const d = await fetch(import.meta.env.BASE_URL + url);
  const j = await d.json();
  if (d.ok) {
    return j;
  } else {
    throw new Error(j);
  }
}

/** 获取绝对路径下的public目录里的文件 */
export async function getDataText(url: string) {
  if (url.startsWith("/")) url = url.substring(1);
  const d = await fetch(import.meta.env.BASE_URL + url);
  const j = await d.text();
  if (d.ok) {
    return j;
  } else {
    throw new Error(j);
  }
}

export function throttle(fn: Function, delay: number) {
  let timeId: number | null = null;
  return (...arg) => {
    if (timeId !== null) {
      clearTimeout(timeId);
    }
    return new Promise((res) => {
      timeId = setTimeout(() => {
        res(fn(...arg));
      }, delay) as unknown as number;
    });
  };
}

/** 找到矩阵里第一列的前缀是某个字符串的项，有节流 */
export async function filterPrefix(data: [string, string][], aim: string) {}

function findItem(data: [string, string][], aim: string) {
  return data.filter((v) => v[0].length === aim.length && v[0] === aim);
}

function findPrefix(data: [string, string][], aim: string) {
  return data.filter((v) => v[0].length > aim.length && v[0].startsWith(aim));
}
