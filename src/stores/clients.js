import { db } from "../firebase";
import { SET_ERROR_MESSAGE, SET_PENDING, SET_SUCCESS_MESSAGE } from "./common";

export const CLIENTS_PUSH = "clients/push";
export const CLIENTS_FETCH = "clients/fetch";
export const CLIENTS_CREATE = "clients/create";
export const CLIENTS_SET = "clients/set";
export const CLIENTS_UPDATE_LOCALLY = "clients/updateLocally";
export const CLIENTS_UPDATE = "clients/update";
export const CLIENTS_DELETE = "clients/delete";
export const CLIENTS_DELETE_LOCALLY = "clients/deleteLocally";

const PERSISTENT_KEY = "store-clients";

export let clients = store => {
  store.on(CLIENTS_PUSH, (state, client) => ({ clients: [client, ...state.clients] }));
  store.on(CLIENTS_SET, (_, clients) => ({ clients }));
  store.on(CLIENTS_UPDATE_LOCALLY, (state, client) => ({
    clients: state.clients.map(mapClient =>
      mapClient.id === client.id ? client : mapClient
    ),
  }));
  store.on(CLIENTS_DELETE_LOCALLY, (state, id) => ({
    clients: state.clients.filter(mapClient => mapClient.id !== id),
  }));

  // Async events
  store.on(CLIENTS_CREATE, async (_, client) => {
    store.dispatch(SET_PENDING, true);

    try {
      client = { ...client, createdAt: new Date() };
      const docRef = db.collection("clients").doc();
      docRef.set(client);
      store.dispatch(CLIENTS_PUSH, { ...client, id: docRef.id });
      store.dispatch(SET_SUCCESS_MESSAGE, "Клиент создан");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось создать клиента");
      console.warn("error on clientsCreate");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(CLIENTS_FETCH, async () => {
    store.dispatch(SET_PENDING, true);

    try {
      const query = db.collection("clients").orderBy("createdAt", "desc");
      const queryResult = await query.get();
      const clients = queryResult.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      store.dispatch(CLIENTS_SET, clients);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось загрузить клиентов");
      console.warn("error on clientsFetch");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(CLIENTS_DELETE, async (_, id) => {
    store.dispatch(SET_PENDING, true);

    try {
      db.collection("clients").doc(id).delete();
      store.dispatch(CLIENTS_DELETE_LOCALLY, id);
      store.dispatch(SET_SUCCESS_MESSAGE, "Клиент удалён");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось удалить клиента");
      console.warn("error on clientDelete");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(CLIENTS_UPDATE, async (_, client) => {
    store.dispatch(SET_PENDING, true);

    try {
      db.collection("clients").doc(client.id).update(client);
      store.dispatch(CLIENTS_UPDATE_LOCALLY, client);
      store.dispatch(SET_SUCCESS_MESSAGE, "Клиент обновлён");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось обновить клиента");
      console.warn("error on clientUpdate");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", () => {
    store.dispatch(CLIENTS_FETCH);
    let cachedClients = localStorage.getItem(PERSISTENT_KEY);

    if (cachedClients !== undefined) {
      try {
        cachedClients = JSON.parse(cachedClients);
      } catch (error) {
        console.warn("Error on parse clients cache");
        console.log(error);
        localStorage.removeItem(PERSISTENT_KEY);
      }
    }

    return { clients: cachedClients || [] };
  });

  store.on("@changed", state => {
    try {
      state.clients &&
        localStorage.setItem(PERSISTENT_KEY, JSON.stringify(state.clients));
    } catch (error) {
      console.warn("Error on @changed clients store");
      console.log(error);
    }
  });
};
