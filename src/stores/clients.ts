import { Timestamp } from "@firebase/firestore";
import { createStore } from "solid-js/store";

import { Client, ClientAdditionalInfo, CreateProps, UpdateProps, clientStorage } from "../storage/client";
import { StaticStoreProps } from "./index";
import { notificationsStore } from "./notifications";
import { userStore } from "./userStore";

type Store = { list: Client[] } & StaticStoreProps;

const { pushError, pushSuccess } = notificationsStore;
const { fetchAdditionalInfo, update, create, toArchive, fetchAllOwnedByUser } = clientStorage;

const errorHandler = (err: Error) => (pushError(err.message), console.log(err));

export function clientsFactory() {
	const [store, setStore] = createStore<Store>({
		isLoading: true,
		list: [],
	});

	const fetchClients = () => {
		const onFetched = (clients: Client[]) => {
			setStore("list", clients);
			setStore("isLoading", false);
		};

		fetchAllOwnedByUser(userStore.user.id).then(onFetched, errorHandler);
	};

	const fetchAdditionalInfoOfClient = (clientId: string) => {
		const [store, setStore] = createStore<ClientAdditionalInfo & StaticStoreProps>({
			latestRecord: null,
			countRecords: 0,
			isLoading: true,
		});

		const onFetched = (additionalInfo: ClientAdditionalInfo) => {
			setStore(value => ({ ...value, ...additionalInfo, isLoading: false }));
		};

		fetchAdditionalInfo({ clientId, userId: userStore.user.id }).then(onFetched, errorHandler);
		return store;
	};

	const createClient = (props: CreateProps, onCreateCallback?: () => void) => {
		const onCreated = (client: Client) => {
			setStore("list", clients => [client, ...clients]);
			pushSuccess("Клиент создан");
			onCreateCallback?.();
		};

		create(props).then(onCreated, errorHandler);
	};

	const updateClient = (props: UpdateProps, onUpdateCallback?: () => void) => {
		const onUpdated = (client: Client) => {
			setStore("list", clients => clients.map(c => (client.id === c.id ? client : c)));
			pushSuccess("Клиент обновлен");
			onUpdateCallback?.();
		};

		update(props).then(onUpdated, errorHandler);
	};

	const toArchiveClient = (clientId: string, onArchiveCallback?: () => void) => {
		const onArchived = () => {
			setStore("list", clients => clients.filter(c => c.id !== clientId));
			onArchiveCallback?.();
			pushSuccess("Клиент удален");
		};

		toArchive(clientId).then(onArchived, errorHandler);
	};

	return {
		clients: store,
		fetch: fetchClients,
		create: createClient,
		update: updateClient,
		toArchive: toArchiveClient,
		fetchAdditionalInfo: fetchAdditionalInfoOfClient,
	};
}

export const clientsStore = clientsFactory();
