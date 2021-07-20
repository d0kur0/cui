import { format } from "date-fns";
import {
  statisticGetMonthDaysCount,
  statisticGetMonthRecords,
  statisticGetMonthRecordsFromCache,
} from "../api/statistic";

export const STATISTIC_CALC_MONTH_DAYS_COUNT = "statistic/calcMonthDaysCount";
export const STATISTIC_SET_MONTH_DAYS_COUNT = "statistic/setMonthDaysCount";
export const STATISTIC_SET_MONTH_RECORDS = "statistic/setMonthRecords";

let previousMonth;

export let statistic = store => {
  store.on(STATISTIC_SET_MONTH_DAYS_COUNT, (_, monthDaysCount) => {
    return { monthDaysCount };
  });

  store.on(STATISTIC_SET_MONTH_RECORDS, (_, monthRecords) => {
    return { monthRecords };
  });

  store.on(STATISTIC_CALC_MONTH_DAYS_COUNT, async ({ user, recordsDate }) => {
    try {
      const monthRecords = await statisticGetMonthRecords({
        userId: user.id,
        date: recordsDate,
      });

      const monthDaysCount = statisticGetMonthDaysCount({ records: monthRecords });

      store.dispatch(STATISTIC_SET_MONTH_RECORDS, monthRecords);
      store.dispatch(STATISTIC_SET_MONTH_DAYS_COUNT, monthDaysCount);
    } catch (error) {
      console.warn(`error on ${STATISTIC_CALC_MONTH_DAYS_COUNT}`);
      console.error(error);
    }
  });

  store.on("@init", ({ recordsDate }) => {
    const cachedMonthRecords = statisticGetMonthRecordsFromCache({ date: recordsDate });
    const cachedDaysCount = statisticGetMonthDaysCount({ records: cachedMonthRecords });

    return {
      monthDaysCount: cachedDaysCount || {},
      monthRecords: cachedMonthRecords || [],
    };
  });

  store.on("@changed", ({ recordsDate, user }) => {
    if (!recordsDate || !user.isSignedIn) return;
    const currentMonth = format(recordsDate, "LL-yyyy");

    if (previousMonth !== currentMonth) {
      store.dispatch(STATISTIC_CALC_MONTH_DAYS_COUNT);
    }

    previousMonth = currentMonth;
  });
};
