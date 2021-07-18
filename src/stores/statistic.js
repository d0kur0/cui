import { endOfMonth, format, getDate, startOfMonth } from "date-fns";
import { db } from "../firebase";

export const STATISTIC_CALC_MONTH_DAYS_COUNT = "statistic/calcMonthDaysCount";
export const STATISTIC_SET_MONTH_DAYS_COUNT = "statistic/setMonthDaysCount";

const getPersistentKey = recordsDate => {
  return `monthDaysCount_${format(recordsDate, "LL-yyyy")}`;
};

let previousMonth;

export let statistic = store => {
  store.on("@init", state => {
    let cachedCounter;

    try {
      const valueFormCache = localStorage.getItem(getPersistentKey(state.recordsDate));
      valueFormCache !== undefined && (cachedCounter = JSON.parse(valueFormCache));
    } catch (error) {
      console.warn("error on init statistic");
      console.log(error);
    }

    return { monthDaysCount: cachedCounter || {} };
  });

  store.on(STATISTIC_SET_MONTH_DAYS_COUNT, (_, monthDaysCount) => ({ monthDaysCount }));

  store.on(STATISTIC_CALC_MONTH_DAYS_COUNT, async state => {
    try {
      const startDate = startOfMonth(state.recordsDate);
      startDate.setHours(0, 0, 0);

      const endDate = endOfMonth(state.recordsDate);
      endDate.setHours(23, 59, 59);

      const query = db
        .collection("records")
        .orderBy("date", "desc")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate);

      const queryResult = await query.get();

      const recordDates = queryResult.docs.map(doc => {
        const record = doc.data();
        return { date: record.date.toDate() };
      });

      const monthDaysCount = recordDates.reduce((acc, { date }) => {
        const dayOfMonth = getDate(date);
        acc[dayOfMonth] = (acc?.[dayOfMonth] || 0) + 1;
        return acc;
      }, {});

      localStorage.setItem(
        getPersistentKey(state.recordsDate),
        JSON.stringify(monthDaysCount)
      );

      store.dispatch(STATISTIC_SET_MONTH_DAYS_COUNT, monthDaysCount);
    } catch (error) {
      console.warn("error on calcMonthDaysCount");
      console.log(error);
    }
  });

  store.on("@changed", state => {
    if (!state.recordsDate) return;

    const currentMonth = format(state.recordsDate, "LL-yyyy");

    if (previousMonth !== currentMonth) {
      store.dispatch(STATISTIC_CALC_MONTH_DAYS_COUNT);
    }

    previousMonth = currentMonth;
  });
};
