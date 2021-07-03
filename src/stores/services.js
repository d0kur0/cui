import { db } from "../firebase";
import { SET_ERROR_MESSAGE, SET_PENDING, SET_SUCCESS_MESSAGE } from "./common";

export const SERVICES_PUSH = "services/push";
export const SERVICES_FETCH = "services/fetch";
export const SERVICES_CREATE = "services/create";
export const SERVICES_SET = "services/set";
export const SERVICES_UPDATE_LOCALLY = "services/updateLocally";
export const SERVICES_UPDATE = "services/update";
export const SERVICES_DELETE = "services/delete";
export const SERVICES_DELETE_LOCALLY = "services/deleteLocally";

const PERSISTENT_KEY = "store-services";

export let services = store => {
  store.on(SERVICES_PUSH, (state, service) => ({
    services: [service, ...state.services],
  }));
  store.on(SERVICES_SET, (_, services) => ({ services }));
  store.on(SERVICES_UPDATE_LOCALLY, (state, service) => ({
    services: state.services.map(mapService =>
      mapService.id === service.id ? service : mapService
    ),
  }));
  store.on(SERVICES_DELETE_LOCALLY, (state, id) => ({
    services: state.services.filter(mapService => mapService.id !== id),
  }));

  // Async events
  store.on(SERVICES_CREATE, async (_, service) => {
    store.dispatch(SET_PENDING, true);

    try {
      service = { ...service, createdAt: new Date() };
      const docRef = db.collection("services").doc();
      docRef.set(service);
      store.dispatch(SERVICES_PUSH, { ...service, id: docRef.id });
      store.dispatch(SET_SUCCESS_MESSAGE, "Услуга создана");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось создать услугу");
      console.warn("error on servicesCreate");
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(SERVICES_FETCH, async () => {
    store.dispatch(SET_PENDING, true);

    try {
      const query = db.collection("services").orderBy("createdAt", "desc");
      const queryResult = await query.get();
      const services = queryResult.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      store.dispatch(SERVICES_SET, services);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось загрузить услуги");
      console.warn("error on servicesFetch");
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(SERVICES_DELETE, async (_, id) => {
    store.dispatch(SET_PENDING, true);

    try {
      db.collection("services").doc(id).delete();
      store.dispatch(SERVICES_DELETE_LOCALLY, id);
      store.dispatch(SET_SUCCESS_MESSAGE, "Усуга удалена");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось удалить услугу");
      console.warn("error on serviceDelete");
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(SERVICES_UPDATE, async (_, service) => {
    store.dispatch(SET_PENDING, true);

    try {
      db.collection("services").doc(service.id).update(service);
      store.dispatch(SERVICES_UPDATE_LOCALLY, service);
      store.dispatch(SET_SUCCESS_MESSAGE, "Услуга обновлна");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось обновить услугу");
      console.warn("error on serviceUpdate");
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", () => {
    store.dispatch(SERVICES_FETCH);
    let cachedServices = localStorage.getItem(PERSISTENT_KEY);
    if (cachedServices !== undefined) {
      try {
        cachedServices = JSON.parse(cachedServices);
      } catch (error) {
        console.warn("Error on parse services cache");
        console.error(error);
        localStorage.removeItem(PERSISTENT_KEY);
      }
    }
    console.log(cachedServices);
    return { services: cachedServices || [] };
  });

  store.on("@changed", store =>
    localStorage.setItem(PERSISTENT_KEY, JSON.stringify(store.services))
  );
};
