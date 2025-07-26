

function getStringDate(dateparam) {
  let date = new Date(dateparam);
  const option = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("fr-FR", option).format(date);
}

function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();                     // 2025
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // 07
  const dd = String(today.getDate()).padStart(2, '0');      // 26
  return `${yyyy}-${mm}-${dd}`;                         // 2025-07-26
}


export { getStringDate, getTodayDate };