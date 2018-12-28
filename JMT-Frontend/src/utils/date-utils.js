/**
 * @param {string} number
 * returns a string with minutes
 * ex) '1530' -> 15.30, '500' -> 5, '1700' -> 17
 */
export const getNumberWithHourAndMinutes = (number) => {
  const hours = number / 100;
  const minutes = number % 100;

  if (minutes) {
    return `${hours.toFixed(0)}.${minutes}`;
  }

  return hours.toFixed(0);
};

/**
* @param {number} time
* returns time with period
* ex) 1530 -> 3.30pm, 0100 -> 1am
*/
export const getTimeWithPeriod = (time) => {
  let result = '';
  const num = typeof time === 'string' ? Number(time) : time;

  if (num > 1200) {
    result += `${getNumberWithHourAndMinutes(num - 1200)}pm`;
  } else {
    result += `${getNumberWithHourAndMinutes(num)}am`;
  }

  return result;
};


export const convertDateObject = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

