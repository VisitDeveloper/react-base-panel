
export function numberToFixed(number: number, toFixed: number): number {
    let stringedNumber: string = number.toFixed(toFixed);
    let numericValue: number = Number(stringedNumber);
    let isNotNumber: boolean = isNaN(numericValue);
    let value: number = isNotNumber ? 0 : numericValue;
    return value;
  }
  
  