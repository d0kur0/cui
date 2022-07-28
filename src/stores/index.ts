import { clientsStore } from "./clients";
import { notificationsStore } from "./notifications";
import { recordsStore } from "./records";
import { servicesStore } from "./services";
import { statisticsStore } from "./statistics";
import { userStore } from "./userStore";

export type StaticStoreProps = {
	isLoading: boolean;
};

const stores = {
	user: userStore,
	clients: clientsStore,
	records: recordsStore,
	services: servicesStore,
	statistics: statisticsStore,
	notifications: notificationsStore,
};

export function useStore<T extends keyof typeof stores>(store: T): typeof stores[T] {
	return stores[store];
}
