export const convertDateToUnixTimeStamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};
/* getTime returns milliseconds , finhub api uses seconds. We are converting from ms -> s */

export const convertUnixTimeStampToDate = (unixTimeStamp) => {
  const milliseconds = unixTimeStamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
}; // will help with formating info to user

export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
//creates start date and end date which pass through api
