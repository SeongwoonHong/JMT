// returns current time in date/month/year format
export const getDate = (): string => {
  const today = new Date();
  let date: string = today.getDate().toString();
  let month: string = (today.getMonth() + 1).toString();
  const year: string = today.getFullYear().toString();

  if (parseInt(date, 10) < 10) {
    date = `0${date}`;
  }

  if (parseInt(month, 10) < 10) {
    month = `0${month}`;
  }

  return `${date}/${month}/${year}`;
};
