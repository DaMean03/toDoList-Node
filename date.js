export default function date() {
  let date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    "November",
    "December",
  ];

  let dayOfWeek = date.getDay();
  let dayOfMonth = date.getDate();
  let month = date.getMonth();

  return `${daysOfWeek[dayOfWeek]}, ${months[month]} ${dayOfMonth}`;
}
