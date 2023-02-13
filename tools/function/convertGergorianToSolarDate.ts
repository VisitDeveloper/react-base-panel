export function isoStringDateToSolarDate(time: string): string {
    if (time.length > 10) {
      return "invalid date";
    }
    const date = new Date(time);
    return date.toLocaleDateString("fa");
  }
  
  export function isoStringDateTimeToSolarDate(time: string): string {
    if (time.length < 11) {
      return "invalid date";
    }
    const date = new Date(time).toLocaleDateString("fa", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return date;
  }
  
  export function isoStringDateTimeToTimestamp(time: string): number | string {
    if (time.length < 11) {
      return "invalid date";
    }
    const dt = new Date(time).getTime();
    return dt;
  }
  
  export function isoStringDateToTimestamp(time: string): number | string {
    if (time.length > 10) {
      return "invalid date";
    }
    const dt = new Date("2022-04-16").getTime();
    return dt;
  }
  
  export function timestampToDateIsoString(time: number): string {
    const dt = new Date(time).toISOString();
    return dt;
  }
  
  export function timestampToDateTimeIsoString(time: number): string {
    const dt = new Date(time).toISOString();
    return dt;
  }
  
  export function isoStringDateToBackEndFormat(date: string): string {
    if (date.length < 10) return "";
    return date.slice(0, 10);
  }
  