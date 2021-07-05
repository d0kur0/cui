import { sub, add, getDay } from "date-fns";

export const getWeekDays = recordsDate => {
  const currentDayOfWeek = getDay(recordsDate) || 7;
  const mapOfWeekDays = [];

  for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
    const days = Math.abs(currentDayOfWeek - dayOfWeek);
    const isSub = dayOfWeek < currentDayOfWeek;
    const dayDate = isSub ? sub(recordsDate, { days }) : add(recordsDate, { days });

    mapOfWeekDays.push(dayDate);
  }

  return mapOfWeekDays;
};
