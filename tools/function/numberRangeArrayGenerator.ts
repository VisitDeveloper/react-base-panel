export function numberRangeWithStep(
    start: number,
    end: number,
    step: number = 1
  ): Array<number> {
    const length: number = Math.floor((end - start) / step) + 1;
    return Array(length)
      .fill(null)
      .map((_, idx) => start + idx * step);
  }
  