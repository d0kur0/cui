import { SET_ERROR_MESSAGE, SET_PENDING, SET_SUCCESS_MESSAGE } from "./common";
import { STATISTIC_CALC_MONTH_DAYS_COUNT } from "./statistic";
import {
  recordCreate,
  recordDelete,
  recordGetAll,
  recordGetFromCache,
  recordSetToCache,
  recordUpdate,
} from "./../api/records";

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

export let records = store => {
  store.on(RECORDS_SET_DATE, async (_, recordsDate) => {
    store.dispatch(RECORDS_SET_DATE_LOCALLY, recordsDate);
    store.dispatch(RECORDS_FETCH);
  });

  store.on(RECORDS_SET_DATE_LOCALLY, (_, recordsDate) => {
    return { recordsDate };
  });

  store.on(RECORDS_DELETE_LOCALLY, ({ records }, id) => {
    return { records: records.filter(r => r.id !== id) };
  });

  store.on(RECORDS_UPDATE_LOCALLY, ({ records }, newRecord) => {
    const updatedRecords = records.map(record =>
      record.id === newRecord.id ? newRecord : record
    );

    return { records: updatedRecords };
  });

  store.on(RECORDS_PUSH, ({ records }, record) => {
    return { records: [record, ...records] };
  });

  store.on(RECORDS_SET, (_, records) => {
    return { records };
  });

  store.on(RECORDS_DELETE, async (_, recordId) => {
    store.dispatch(SET_PENDING, true);

    try {
      recordDelete({ recordId });
      store.dispatch(RECORDS_DELETE_LOCALLY, recordId);
      store.dispatch(SET_SUCCESS_MESSAGE, "Запись удалена");
      store.dispatch(STATISTIC_CALC_MONTH_DAYS_COUNT);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось удалить запись");
      console.warn(`error on ${RECORDS_DELETE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(RECORDS_UPDATE, async (_, record) => {
    store.dispatch(SET_PENDING, true);

    try {
      recordUpdate({ record });
      store.dispatch(RECORDS_UPDATE_LOCALLY, record);
      store.dispatch(SET_SUCCESS_MESSAGE, "Услуга обновлена");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось обновить запись");
      console.warn(`error on ${RECORDS_UPDATE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(RECORDS_CREATE, async ({ user }, record) => {
    store.dispatch(SET_PENDING, true);

    try {
      const id = recordCreate({ record, userId: user.id });
      store.dispatch(RECORDS_PUSH, { ...record, id });
      store.dispatch(SET_SUCCESS_MESSAGE, "Запись создана");
      store.dispatch(STATISTIC_CALC_MONTH_DAYS_COUNT);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось создать запись");
      console.warn(`error on ${RECORDS_CREATE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(RECORDS_FETCH, async ({ user, recordsDate }) => {
    store.dispatch(SET_PENDING, true);

    try {
      const records = await recordGetAll({ userId: user.id, date: recordsDate });
      store.dispatch(RECORDS_SET, records);
      store.dispatch(STATISTIC_CALC_MONTH_DAYS_COUNT);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось загрузить записи");
      console.warn(`error on ${RECORDS_FETCH}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", ({ recordsDate }) => {
    const date = recordsDate || new Date();
    return { recordsDate: new Date(), records: recordGetFromCache({ date }) || [] };
  });

  store.on("@changed", ({ records, recordsDate }) => {
    const date = recordsDate || new Date();
    records && recordSetToCache({ date, records });
  });
};
