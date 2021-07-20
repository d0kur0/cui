import { format } from "date-fns";
import { db } from "../firebase";

const COLLECTION = "records";

const getPersistentKey = date => {
  try {
    return `cached-records_${format(date, "dd-LL-yyyy")}`;
  } catch (error) {
    console.warn("error on getPersistentKey in records api");
    console.error(error);
    return null;
  }
};

export const recordDelete = async ({ recordId }) => {
  return db.collection(COLLECTION).doc(recordId).delete();
};

export const recordUpdate = async ({ record }) => {
  return db.collection(COLLECTION).doc(record.id).update(record);
};

export const recordCreate = ({ userId, record }) => {
  record = { ...record, createdAt: new Date(), date: new Date(record.date), userId };
  const docRef = db.collection(COLLECTION).doc();
  docRef.set(record);
  return docRef.id;
};

export const recordGetAll = async ({ userId, date }) => {
  const startDate = date ? new Date(date.getTime()) : new Date();
  startDate.setHours(0, 0, 0);

  const endDate = date ? new Date(date.getTime()) : new Date();
  endDate.setHours(23, 59, 59);

  const resource = await db
    .collection(COLLECTION)
    .where("userId", "==", userId)
    .where("date", ">=", startDate)
    .where("date", "<=", endDate)
    .get();

  const records = resource.docs.map(doc => {
    const record = doc.data();

    return {
      id: doc.id,
      ...record,
      date: record.date.toDate(),
      createdAt: record.createdAt.toDate(),
    };
  });

  return records.sort((a, b) => b.date - a.date).reverse();
};

export const recordGetFromCache = ({ date }) => {
  const persistentKey = getPersistentKey(date);
  const cachedRecordsAsJson = localStorage.getItem(persistentKey);

  if (cachedRecordsAsJson) {
    try {
      const cachedRecords = JSON.parse(cachedRecordsAsJson);
      return cachedRecords.map(record => ({
        ...record,
        date: new Date(record.date),
        createdAt: new Date(record.createdAt),
      }));
    } catch (error) {
      localStorage.removeItem(persistentKey);
      console.warn("error on recordGetFromCache");
      console.error(error);
    }
  }
};

export const recordSetToCache = ({ records, date }) => {
  if (!records || !records.length) return;
  const persistentKey = getPersistentKey(date);

  try {
    const recordsAsJson = JSON.stringify(records);
    localStorage.setItem(persistentKey, recordsAsJson);
  } catch (error) {
    console.warn("error on recordSetToCache");
    console.error(error);
  }
};
