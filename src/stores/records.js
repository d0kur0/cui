import { format } from "date-fns";
import { db } from "../firebase";
import { SET_ERROR_MESSAGE, SET_PENDING, SET_SUCCESS_MESSAGE } from "./common";

export const RECORDS_SET_DATE = "records/setDate";
export const RECORDS_SET_DATE_LOCALLY = "records/setDateLocally";
export const RECORDS_SET = "records/set";
export const RECORDS_PUSH = "records/push";
export const RECORDS_FETCH = "records/fetch";
export const RECORDS_UPDATE_LOCALLY = "records/updateLocally";
export const RECORDS_UPDATE = "records/update";
export const RECORDS_DELETE_LOCALLY = "records/deleteLocally";
export const RECORDS_DELETE = "records/delete";
export const RECORDS_CREATE = "records/create";

const PERSISTENT_KEY = "store-records";

export let records = store => {
  store.on(RECORDS_SET_DATE, async (_, recordsDate) => {
    store.dispatch(RECORDS_SET_DATE_LOCALLY, recordsDate);
    store.dispatch(RECORDS_FETCH);
  });

  store.on(RECORDS_SET_DATE_LOCALLY, (_, recordsDate) => {
    return { recordsDate };
  });

  store.on(RECORDS_DELETE_LOCALLY, (state, id) => ({
    records: state.records.filter(record => record.id !== id),
  }));

  store.on(RECORDS_UPDATE_LOCALLY, (state, record) => ({
    records: state.records.map(mapRecord =>
      mapRecord.id === record.id ? record : mapRecord
    ),
  }));

  store.on(RECORDS_PUSH, (state, record) => ({ records: [record, ...state.records] }));
  store.on(RECORDS_SET, (_, records) => ({ records }));

  // Async tasks
  store.on(RECORDS_DELETE, async (_, id) => {
    store.dispatch(SET_PENDING, true);

    try {
      db.collection("records").doc(id).delete();
      store.dispatch(RECORDS_DELETE_LOCALLY, id);
      store.dispatch(SET_SUCCESS_MESSAGE, "Запись удалена");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось удалить запись");
      console.warn("error on recordDelete");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(RECORDS_UPDATE, async (_, record) => {
    store.dispatch(SET_PENDING, true);

    try {
      db.collection("records").doc(record.id).update(record);
      store.dispatch(RECORDS_UPDATE_LOCALLY, record);
      store.dispatch(SET_SUCCESS_MESSAGE, "Услуга обновлена");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось обновить запись");
      console.warn("error on recordUpdate");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(RECORDS_CREATE, async (_, record) => {
    store.dispatch(SET_PENDING, true);

    try {
      record = { ...record, createdAt: new Date(), date: new Date(record.date) };
      const docRef = db.collection("records").doc();
      docRef.set(record);
      store.dispatch(RECORDS_PUSH, { ...record, id: docRef.id });
      store.dispatch(SET_SUCCESS_MESSAGE, "Запись создана");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось создать запись");
      console.warn("error on recordCreate");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(RECORDS_FETCH, async state => {
    store.dispatch(SET_PENDING, true);

    try {
      const startDate = state.recordsDate
        ? new Date(state.recordsDate.getTime())
        : new Date();
      startDate.setHours(0, 0, 0);

      const endDate = state.recordsDate
        ? new Date(state.recordsDate.getTime())
        : new Date();
      endDate.setHours(23, 59, 59);

      const query = db
        .collection("records")
        .orderBy("date", "desc")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate);

      const queryResult = await query.get();

      const records = queryResult.docs.map(doc => {
        const record = doc.data();

        return {
          id: doc.id,
          ...record,
          date: record.date.toDate(),
          createdAt: record.createdAt.toDate(),
        };
      });

      store.dispatch(RECORDS_SET, records);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось загрузить записи");
      console.warn("error on recordsFetch");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", state => {
    const currentDate = state.recordsDate || new Date();
    let cachedRecords = localStorage.getItem(
      `${PERSISTENT_KEY}_${format(currentDate, "dd-LL-yyyy")}`
    );

    if (cachedRecords !== undefined) {
      try {
        cachedRecords = JSON.parse(cachedRecords);
        cachedRecords = cachedRecords.map(record => ({
          ...record,
          date: new Date(record.date),
          createdAt: new Date(record.createdAt),
        }));
      } catch (error) {
        console.warn("Error on parse records cache");
        console.log(error);
        localStorage.removeItem(PERSISTENT_KEY);
      }
    }

    store.dispatch(RECORDS_FETCH);
    return { recordsDate: new Date(), records: cachedRecords || [] };
  });

  store.on("@changed", state => {
    try {
      const currentDate = state.recordsDate || new Date();
      state.records &&
        localStorage.setItem(
          `${PERSISTENT_KEY}_${format(currentDate, "dd-LL-yyyy")}`,
          JSON.stringify(state.records)
        );
    } catch (error) {
      console.warn("Error on @changes records state");
      console.log(error);
    }
  });
};
