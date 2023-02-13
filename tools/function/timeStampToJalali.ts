export const timeStampChangeToJalai = (timeStamp: number) => {
    const date = new Date(timeStamp);
    const option: any = {
      // weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("fa-IR", option);
  };
  
  