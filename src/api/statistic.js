import { startOfMonth, getDate, format, endOfMonth } from "date-fns";
import { db } from "../firebase";

const COLLECTION = "records";

const getPersistentKey = date => {
  try {
    return `cached-month-records_${format(date, "LL-yyyy")}`;
  } catch (error) {
    console.warn("error on getPersistentKey of statistic");
    console.error(error);
    return null;
  }
};

export const statisticGetMonthRecords = async ({ userId, date }) => {
  const startDate = startOfMonth(date);
  startDate.setHours(0, 0, 0);

  const endDate = endOfMonth(date);
  endDate.setHours(23, 59, 59);

  const resource = await db
    .collection(COLLECTION)
    .where("userId", "==", userId)
    .where("date", ">=", startDate)
    .where("date", "<=", endDate)
    .get();

  const records = resource.docs.map(doc => {
    const record = doc.data();
    return { ...record, date: record.date.toDate(), createdAt: record.date.toDate() };
  });

  return records;
};

export const statisticGetMonthDaysCount = ({ records }) => {
  if (!records) return;

  const monthDaysCount = records.reduce((acc, { date }) => {
    const dayOfMonth = getDate(date);
    acc[dayOfMonth] = (acc?.[dayOfMonth] || 0) + 1;
    return acc;
  }, {});

  return monthDaysCount;
};

export const statisticGetMonthRecordsFromCache = ({ date }) => {
  const persistentKey = getPersistentKey(date);
  const cachedMonthRecordsAsJson = localStorage.getItem(persistentKey);

  if (cachedMonthRecordsAsJson) {
    try {
      const cachedMonthRecords = JSON.parse(cachedMonthRecordsAsJson);
      return cachedMonthRecords.map(record => {
        return {
          ...record,
          date: new Date(record.date),
          createdAt: new Date(record.createdAt),
        };
      });
    } catch (error) {
      console.warn("error on statisticGetMonthRecordsFromCache");
      console.error(error);
      return [];
    }
  }
};
