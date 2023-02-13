export function isTowArraysEqual(
    arrayOne: Array<number>,
    arrayTwo: Array<number>
  ): boolean {
    if (arrayOne.length !== arrayTwo.length) return false;
  
    let isOneCoverTwo = true;
  
    for (let i = 0; i < arrayTwo.length; i++) {
      if (arrayOne.includes(arrayTwo[i]) === false) {
        isOneCoverTwo = false;
        break;
      }
    }
  
    if (!isOneCoverTwo) return false;
  
    let isTwoCoverOne = true;
  
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayTwo.includes(arrayOne[i]) === false) {
        isTwoCoverOne = false;
        break;
      }
    }
  
    return isOneCoverTwo && isTwoCoverOne;
  }
  