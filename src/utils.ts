const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getParsedMonthDate = (d: Date): string => {
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
};
