import { SET_ERROR_MESSAGE, SET_PENDING, SET_SUCCESS_MESSAGE } from "./common";
import {
  clientCreate,
  clientDelete,
  clientGetAll,
  clientGetFormCache,
  clientSetToCache,
  clientUpdate,
} from "./../api/clients";

export const CLIENTS_PUSH = "clients/push";
export const CLIENTS_FETCH = "clients/fetch";
export const CLIENTS_CREATE = "clients/create";
export const CLIENTS_SET = "clients/set";
export const CLIENTS_UPDATE_LOCALLY = "clients/updateLocally";
export const CLIENTS_UPDATE = "clients/update";
export const CLIENTS_DELETE = "clients/delete";
export const CLIENTS_DELETE_LOCALLY = "clients/deleteLocally";

export let clients = store => {
  store.on(CLIENTS_PUSH, ({ clients }, client) => {
    return { clients: [client, ...clients] };
  });

  store.on(CLIENTS_SET, (_, clients) => {
    return { clients };
  });

  store.on(CLIENTS_UPDATE_LOCALLY, ({ clients }, newClient) => {
    const updatedClients = clients.map(client =>
      client.id === newClient.id ? newClient : client
    );

    return { clients: updatedClients };
  });

  store.on(CLIENTS_DELETE_LOCALLY, ({ clients }, id) => {
    return { clients: clients.filter(c => c.id !== id) };
  });

  store.on(CLIENTS_CREATE, async ({ user }, client) => {
    store.dispatch(SET_PENDING, true);

    try {
      const id = clientCreate({ client, userId: user.id });
      store.dispatch(CLIENTS_PUSH, { ...client, id });
      store.dispatch(SET_SUCCESS_MESSAGE, "Клиент создан");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось создать клиента");
      console.warn(`error on ${CLIENTS_CREATE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(CLIENTS_FETCH, async ({ user }) => {
    store.dispatch(SET_PENDING, true);

    try {
      store.dispatch(CLIENTS_SET, await clientGetAll({ userId: user.id }));
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось загрузить клиентов");
      console.warn(`error on ${CLIENTS_FETCH}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(CLIENTS_DELETE, async (_, clientId) => {
    store.dispatch(SET_PENDING, true);

    try {
      clientDelete({ clientId });
      store.dispatch(CLIENTS_DELETE_LOCALLY, clientId);
      store.dispatch(SET_SUCCESS_MESSAGE, "Клиент удалён");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось удалить клиента");
      console.warn(`error on ${CLIENTS_DELETE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(CLIENTS_UPDATE, async (_, client) => {
    store.dispatch(SET_PENDING, true);

    try {
      clientUpdate({ client });
      store.dispatch(CLIENTS_UPDATE_LOCALLY, client);
      store.dispatch(SET_SUCCESS_MESSAGE, "Клиент обновлён");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось обновить клиента");
      console.warn(`error on ${CLIENTS_UPDATE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", () => {
    return { clients: clientGetFormCache() || [] };
  });

  store.on("@changed", ({ clients }) => {
    clients && clientSetToCache({ clients });
  });
};
