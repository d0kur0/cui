import { on } from "solid-js";
import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { CreateProps, Service, UpdateProps, serviceStorage } from "../storage/service";
import { notificationsStore } from "./notifications";
import { userStore } from "./user";

type Store = { list: Service[] } & StaticStoreProps;

const { pushSuccess, pushError } = notificationsStore;
const { fetchAllOwnedByUser, create, toArchive, update } = serviceStorage;

const errorHandler = (err: Error) => pushError(err.message);

function createServicesStore() {
	const [store, setStore] = createStore<Store>({ list: [], isLoading: true });

	const fetchServices = () => {
		const onFetched = (services: Service[]) => {
			setStore("list", services);
			setStore("isLoading", false);
		};

		fetchAllOwnedByUser(userStore.user.id).then(onFetched, errorHandler);
	};

	const createService = (props: CreateProps, onCreateCallback?: () => void) => {
		const onCreate = (service: Service) => {
			setStore("list", services => [service, ...services]);
			pushSuccess("Услуга создана");
			onCreateCallback?.();
		};

		create(props).then(onCreate, errorHandler);
	};

	const updateService = (props: UpdateProps, onUpdateCallback?: () => void) => {
		const onUpdate = (service: Service) => {
			setStore("list", services => services.map(s => (service.id === s.id ? service : service)));
			pushSuccess("Услуга обновлена");
			onUpdateCallback?.();
		};

		update(props).then(onUpdate, errorHandler);
	};

	const toArchiveService = (serviceId: string, onArchiveCallback?: () => void) => {
		const onArchived = (serviceId: string) => {
			setStore("list", services => services.filter(service => service.id !== serviceId));
			onArchiveCallback?.();
			pushSuccess("Услуга удалена");
		};

		toArchive(serviceId).then(onArchived, errorHandler);
	};

	return {
		services: store,
		fetch: fetchServices,
		update: updateService,
		create: createService,
		toArchive: toArchiveService,
	};
}

export const servicesStore = createServicesStore();
