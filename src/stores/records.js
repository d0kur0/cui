export const RECORDS_SET_DATE = "records/setDate";
export const RECORDS_SET = "records/set";
export const RECORDS_FETCH = "records/fetch";
export const RECORDS_UPDATE_LOCALLY = "records/updateLocally";
export const RECORDS_UPDATE = "records/update";
export const RECORDS_DELETE_LOCALLY = "records/deleteLocally";
export const RECORDS_DELETE = "records/delete";

export let records = store => {
  store.on(RECORDS_SET_DATE, (_, recordsDate) => ({ recordsDate }));

  store.on("@init", () => {
    store.dispatch(RECORDS_FETCH);
    return { recordsDate: new Date(), records: [] };
  });
};
