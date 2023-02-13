export function persianToEnglishNum(stringedNumber: string) {
    const persianNumbers: Array<any> = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    const arabicNumbers: Array<any> = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];
    if (typeof stringedNumber === "string") {
      for (let i: number = 0; i < 10; i++) {
        stringedNumber = stringedNumber
          .replace(persianNumbers[i], i.toString())
          .replace(arabicNumbers[i], i.toString());
      }
    }
    return stringedNumber;
  }
  