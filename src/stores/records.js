export let records = store => {
  store.on("@init", () => {
    return { recordsDate: new Date(), records: [] };
  });
};
