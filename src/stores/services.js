import { SET_ERROR_MESSAGE, SET_PENDING, SET_SUCCESS_MESSAGE } from "./common";
import {
  serviceCreate,
  serviceDelete,
  serviceGetAll,
  serviceGetFormCache,
  serviceSetToCache,
  serviceUpdate,
} from "./../api/services";

export const SERVICES_PUSH = "services/push";
export const SERVICES_FETCH = "services/fetch";
export const SERVICES_CREATE = "services/create";
export const SERVICES_SET = "services/set";
export const SERVICES_UPDATE_LOCALLY = "services/updateLocally";
export const SERVICES_UPDATE = "services/update";
export const SERVICES_DELETE = "services/delete";
export const SERVICES_DELETE_LOCALLY = "services/deleteLocally";

export let services = store => {
  store.on(SERVICES_PUSH, ({ services }, service) => {
    return { services: [service, ...services] };
  });

  store.on(SERVICES_SET, (_, services) => {
    return { services };
  });

  store.on(SERVICES_UPDATE_LOCALLY, ({ services }, newService) => {
    const updatedServices = services.map(service =>
      service.id === newService.id ? newService : service
    );

    return { services: updatedServices };
  });

  store.on(SERVICES_DELETE_LOCALLY, ({ services }, id) => {
    return { services: services.filter(s => s.id !== id) };
  });

  store.on(SERVICES_CREATE, async ({ user }, service) => {
    store.dispatch(SET_PENDING, true);

    try {
      const id = serviceCreate({ service, userId: user.id });
      store.dispatch(SERVICES_PUSH, { ...service, id });
      store.dispatch(SET_SUCCESS_MESSAGE, "Услуга создана");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось создать услугу");
      console.warn(`error on ${SERVICES_CREATE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(SERVICES_FETCH, async ({ user }) => {
    store.dispatch(SET_PENDING, true);

    try {
      store.dispatch(SERVICES_SET, await serviceGetAll({ userId: user.id }));
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось загрузить услуги");
      console.warn(`error on ${SERVICES_FETCH}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(SERVICES_DELETE, async (_, serviceId) => {
    store.dispatch(SET_PENDING, true);

    try {
      serviceDelete({ serviceId });
      store.dispatch(SERVICES_DELETE_LOCALLY, serviceId);
      store.dispatch(SET_SUCCESS_MESSAGE, "Усуга удалена");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось удалить услугу");
      console.warn(`error on ${SERVICES_DELETE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(SERVICES_UPDATE, async (_, service) => {
    store.dispatch(SET_PENDING, true);

    try {
      serviceUpdate({ service });
      store.dispatch(SERVICES_UPDATE_LOCALLY, service);
      store.dispatch(SET_SUCCESS_MESSAGE, "Услуга обновлна");
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Не удалось обновить услугу");
      console.warn(`error on ${SERVICES_UPDATE}`);
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on("@init", () => {
    return { services: serviceGetFormCache() || [] };
  });

  store.on("@changed", ({ services }) => {
    services && serviceSetToCache(services);
  });
};
