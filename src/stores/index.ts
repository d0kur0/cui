import { clientsStore } from "./clientsStore";
import { notificationsStore } from "./notificationsStore";
import { recordsStore } from "./recordsStore";
import { servicesStore } from "./servicesStore";
import { userStore } from "./userStore";

export type StaticStoreProps = {
	isLoading: boolean;
};

const stores = {
	user: userStore,
	clients: clientsStore,
	records: recordsStore,
	services: servicesStore,
	notifications: notificationsStore,
};

export function useStore<T extends keyof typeof stores>(store: T): typeof stores[T] {
	if (!stores?.[store]) throw new Error(`useStore: store ${store} not found`);
	return stores[store];
}
