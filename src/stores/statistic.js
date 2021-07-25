import { isBefore, isEqual, startOfMonth } from "date-fns";
import {
  statisticGetCounters,
  statisticGetMonthDaysCount,
  statisticGetMonthRecords,
  statisticGetMonthRecordsFromCache,
} from "../api/statistic";
import { SET_ERROR_MESSAGE, SET_PENDING } from "./common";

export const STATISTIC_CALC_MONTH_COUNTS = "statistic/calcMonthCounts";
export const STATISTIC_CALC_MONTH_DAYS_COUNT = "statistic/calcMonthDaysCount";
export const STATISTIC_SET_MONTH_DAYS_COUNT = "statistic/setMonthDaysCount";
export const STATISTIC_SET_MONTH_RECORDS = "statistic/setMonthRecords";
export const STATISTIC_SET_MONTH_COUNTS = "statisitc/setMonthCounts";

export let statistic = store => {
  store.on(STATISTIC_SET_MONTH_DAYS_COUNT, (_, monthDaysCount) => {
    return { monthDaysCount };
  });

  store.on(STATISTIC_SET_MONTH_COUNTS, (_, monthCounts) => {
    return { monthCounts };
  });

  store.on(STATISTIC_SET_MONTH_RECORDS, (_, monthRecords) => {
    return { monthRecords };
  });

  store.on(STATISTIC_CALC_MONTH_COUNTS, async ({ services, user }, date) => {
    store.dispatch(SET_PENDING, true);

    try {
      const currentDate = new Date();

      if (isBefore(currentDate, date)) {
        store.dispatch(STATISTIC_SET_MONTH_COUNTS, { money: 0, records: 0 });
        store.dispatch(SET_PENDING, false);
        return;
      }

      const records = await statisticGetMonthRecords({
        userId: user.id,
        date: date,
        endDateAsToday: isEqual(startOfMonth(date), startOfMonth(currentDate)),
      });

      store.dispatch(
        STATISTIC_SET_MONTH_COUNTS,
        statisticGetCounters({ records, services })
      );
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Ошибка просчета счетчиков календаря");
      console.warn(`error on ${STATISTIC_CALC_MONTH_DAYS_COUNT}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(STATISTIC_CALC_MONTH_DAYS_COUNT, async ({ user, recordsDate }) => {
    store.dispatch(SET_PENDING, true);

    try {
      const monthRecords = await statisticGetMonthRecords({
        userId: user.id,
        date: recordsDate,
      });

      const monthDaysCount = statisticGetMonthDaysCount({ records: monthRecords });

      store.dispatch(STATISTIC_SET_MONTH_RECORDS, monthRecords);
      store.dispatch(STATISTIC_SET_MONTH_DAYS_COUNT, monthDaysCount);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Ошибка просчета счетчиков календаря");
      console.warn(`error on ${STATISTIC_CALC_MONTH_DAYS_COUNT}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", ({ recordsDate }) => {
    const cachedMonthRecords = statisticGetMonthRecordsFromCache({ date: recordsDate });
    const cachedDaysCount = statisticGetMonthDaysCount({ records: cachedMonthRecords });

    return {
      monthDaysCount: cachedDaysCount || {},
      monthRecords: cachedMonthRecords || [],
      monthCounts: { money: 0, records: 0 },
    };
  });
};
