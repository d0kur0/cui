import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { Service, serviceStorage } from "../storage/service";
import { notificationsStore } from "./notifications";
import { userStore } from "./user";

type Store = { list: Service[] } & StaticStoreProps;

const { pushError, pushSuccess } = notificationsStore;

function createServicesStore() {
	const [store, setStore] = createStore<Store>({ list: [], isLoading: true });

	const fetch = () => {
		serviceStorage
			.fetchAllOwnedByUser(userStore.user.id)
			.then(services => setStore(currentValue => ({ ...currentValue, list: services, isLoading: false })))
			.catch(pushError);
	};

	return {
		services: store,
		fetch,
	};
}

export const servicesStore = createServicesStore();
