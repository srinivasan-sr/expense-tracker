function GetLocaleDateString(dateString) {
  let date = new Date(dateString);
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return Intl.DateTimeFormat("en-IN", options).format(date);
}

function getShortDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return Intl.DateTimeFormat("en-IN", options).format(date);
}
function GetNumberInLocale(numberString, locale) {
  return Intl.NumberFormat(locale ? locale : "en-IN").format(numberString);
}
export { GetLocaleDateString, GetNumberInLocale, getShortDate };
