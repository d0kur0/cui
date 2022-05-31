import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { CreateProps, Service, UpdateProps, serviceStorage } from "../storage/service";
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

	const create = (props: CreateProps, onCreateCallback?: () => void) => {
		serviceStorage
			.create(props)
			.then(service => {
				setStore(value => ({ ...value, list: [service, ...value.list] }));
				pushSuccess("Услуга создана");
				onCreateCallback?.();
			})
			.catch(pushError);
	};

	const update = (props: UpdateProps, onUpdateCallback?: () => void) => {
		serviceStorage
			.update(props)
			.then(updatedClient => {
				setStore(value => ({
					...value,
					list: value.list.map(service => (service.id === props.serviceId ? updatedClient : service)),
				}));
				pushSuccess("Услуга обновлена");
				onUpdateCallback?.();
			})
			.catch(pushError);
	};

	const toArchive = (serviceId: string, onArchiveCallback?: () => void) => {
		serviceStorage
			.toArchive(serviceId)
			.then(() => {
				setStore(value => ({
					...value,
					list: value.list.filter(service => service.id !== serviceId),
				}));

				onArchiveCallback?.();
				pushSuccess("Услуга удалена");
			})
			.catch(pushError);
	};

	return {
		services: store,
		fetch,
		update,
		create,
		toArchive,
	};
}

export const servicesStore = createServicesStore();
