export function isNationalIdValid(nationalId : any) {
    // STEP 0: Validate national Id
  
    // Check length is 10
    if (nationalId.length < 8 || 10 < nationalId.length) {
      console.log(false);
      return false;
    }
  
    // Check if all of the numbers are the same
    if (
      nationalId == "0000000000" ||
      nationalId == "1111111111" ||
      nationalId == "2222222222" ||
      nationalId == "3333333333" ||
      nationalId == "4444444444" ||
      nationalId == "5555555555" ||
      nationalId == "6666666666" ||
      nationalId == "7777777777" ||
      nationalId == "8888888888" ||
      nationalId == "9999999999"
    ) {
      console.log(false);
      return false;
    }
  
    // STEP 00 : if nationalId.lenght==8 add two zero on the left
    if (nationalId.length < 10) {
      let zeroNeeded = 10 - nationalId.length;
  
      let zeroString = "";
      if (zeroNeeded == 2) {
        zeroString = "00";
      } else {
        zeroString = "0";
      }
  
      nationalId = zeroString.concat(nationalId);
    }
  
    // STEP 1: Sum all numbers
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += nationalId.charAt(i) * (10 - i);
    }
  
    // STEP 2: MOD ON 11
    let mod = sum % 11;
  
    // STEP 3: Check with 2
    let finalValue;
    if (mod >= 2) {
      finalValue = 11 - mod;
    } else {
      finalValue = mod;
    }
  
    // STEP 4: Final Step check with control value
    if (finalValue == nationalId.charAt(9)) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }