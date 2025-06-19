

function getStringDate(dateparam) {
  let date = new Date(dateparam);
  const option = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("fr-FR", option).format(date);
}

export { getStringDate };