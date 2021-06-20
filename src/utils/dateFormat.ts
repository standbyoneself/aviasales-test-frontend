/** Returns the string representation of the number
 *  that contains `0` at the start
 *  if the `n` argument less then 10
 *  for keeping a readability of an amount of hours, minutes, seconds etc.
 *  @param {number} n
 *  @returns {string} String with `0` even if the number passed in is less then 10
 *
 *  @example
 *  addZero(1) => '01'
 *
 *  @example
 *  addZero(10) => '10'
 */
export const addZero = (n: number): string => {
  return n < 10 ? `0${n}` : `${n}`;
};

/**
 * Returns the string
 * contains the amount of hours
 * accordingly to UTC (GMT)
 * @param {Date} date
 * @returns {string} Hours formatted as `hh`
 *
 * @example
 * const date = new Date('2020-01-04T05:04:37');
 * getUTCHours() => '05'
 */
export const getUTCHours = (date: Date): string => {
  return addZero(date.getUTCHours());
};

/**
 * Returns the string
 * contains the amount of minutes
 * @param {Date} date
 * @returns {string} Minutes formatted as `mm`
 *
 * @example
 * const date = new Date('2020-01-04T05:04:37');
 * getMinutes(date) => '04'
 */
export const getMinutes = (date: Date): string => {
  return addZero(date.getMinutes());
};

/** Returns the string
 *  contains the hours and the minutes
 *  separated by a colon
 *  @param {Date} date
 *  @returns {string} Hours and minutes formatted as `hh:mm`
 *
 *  @example
 *  const date = new Date('2020-01-04T05:04:37');
 *  getTime(date) => `05:04`
 * */
export const getTime = (date: Date): string => {
  const hours = getUTCHours(date);
  const minutes = getMinutes(date);
  return `${hours}:${minutes}`;
};
