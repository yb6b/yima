/** 防抖 */
function throttle(fn: Function, delay: number) {
  let t: number | null = null
  return () => {
    if (t) return
    t = setTimeout(() => { fn(); t = null }, delay) as any;
  }
}

export class Schedule<T> {
  /** 复习安排记录，每次学习完，把第一个项目移到末尾 */
  private record: [count: number, index: number][];

  constructor(private items: T[], private name: string = '') {

    const storedRecords = window.localStorage.getItem(
      `yima_${this.name}_records`
    );
    if (storedRecords) {
      this.record = JSON.parse(storedRecords);
    } else {
      this.record = Array.from({ length: this.items.length }, (_, i) => [-1, i])
    }

    let tmpProgress = 0;
    for (const i of this.record) {
      if (i[0] !== -1) ++tmpProgress;
    }
    this.progress = tmpProgress;
  }

  /** 已经学习过的项目数量 */
  public progress = 0;

  private saveLocal = throttle(() => {
    window.localStorage.setItem(
      `yima_${this.name}_records`,
      JSON.stringify(this.record)
    );
  }, 1000)

  /** 返回第一个项目 */
  public first() {
    return {
      item: this.items[this.record[0][1]],
      isFirst: this.record[0][0] === -1
    };
  }

  /** 将答对的项目移动到后方 */
  public nextSuccess() {
    const maxIndex = this.record.length - 1;
    const firstRecord = this.record[0];
    const firstCount = ++firstRecord[0];

    if (firstCount === 0 && this.progress === firstRecord[1]) {
      this.progress++;
    }

    let step = 0;
    const moveSteps = [2, 4, 8, 12, 20, 30, 60, 100];
    if (firstCount > moveSteps.length - 1) {
      firstRecord[0] = 8;
      step = maxIndex;
    } else {
      step = moveSteps[firstCount];
      if (step > maxIndex) step = maxIndex;
    }

    this.record.copyWithin(0, 1, step + 1);
    this.record[step] = firstRecord;

    this.saveLocal()
    return this.first();
  }


  /** 回答错误后 */
  public nextFail() {
    this.record[0][0] = -1;
    this.saveLocal()
    return this.first();
  }
}
