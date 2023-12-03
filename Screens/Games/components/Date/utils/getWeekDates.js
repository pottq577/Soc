export function getWeekDates(selectedDateStr) {
  const selectedDate = new Date(selectedDateStr);
  const dayOfWeek = selectedDate.getDay();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - dayOfWeek);

  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    let day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDates.push(day.toISOString().split("T")[0]);
  }

  return weekDates;
}
