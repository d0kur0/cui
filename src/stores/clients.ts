import { createStore } from "solid-js/store";

import {
	Client,
	ClientAdditionalInfo,
	CreateProps,
	UpdateProps,
	clientStorage,
} from "../storage/client";
import { StaticStoreProps } from "./index";
import { notificationsStore } from "./notifications";
import { userStore } from "./user";

type Store = { list: Client[] } & StaticStoreProps;

const { pushError, pushSuccess } = notificationsStore;

export function createClientsStore() {
	const [store, setStore] = createStore<Store>({
		isLoading: true,
		list: [],
	});

	const fetch = () => {
		clientStorage
			.fetchAllOwnedByUser(userStore.user.id)
			.then(clients =>
				setStore(currentValue => ({ ...currentValue, list: clients, isLoading: false }))
			)
			.catch(pushError);
	};

	const fetchAdditionalInfo = (clientId: string) => {
		const [store, setStore] = createStore<ClientAdditionalInfo & StaticStoreProps>({
			latestRecord: null,
			countRecords: 0,
			isLoading: true,
		});

		clientStorage
			.fetchAdditionalInfo({ clientId, userId: userStore.user.id })
			.then(additionalInfo =>
				setStore(value => ({ ...value, ...additionalInfo, isLoading: false }))
			);

		return store;
	};

	const create = (props: CreateProps, onCreateCallback?: () => void) => {
		clientStorage
			.create(props)
			.then(client => {
				setStore(value => ({ ...value, list: [client, ...value.list] }));
				pushSuccess("Клиент создан");
				onCreateCallback?.();
			})
			.catch(pushError);
	};

	const update = (props: UpdateProps, onUpdateCallback?: () => void) => {
		clientStorage
			.update(props)
			.then(updatedClient => {
				setStore(value => ({
					...value,
					list: value.list.map(client =>
						client.id === props.clientId ? updatedClient : client
					),
				}));
				pushSuccess("Клиент обновлен");
				onUpdateCallback?.();
			})
			.catch(pushError);
	};

	const toArchive = (clientId: string, onArchiveCallback?: () => void) => {
		clientStorage
			.toArchive(clientId)
			.then(() => {
				setStore(value => ({
					...value,
					list: value.list.filter(client => client.id !== clientId),
				}));

				onArchiveCallback?.();
				pushSuccess("Клиент удален");
			})
			.catch(pushError);
	};

	return {
		fetch,
		create,
		update,
		clients: store,
		toArchive,
		fetchAdditionalInfo,
	};
}

export const clientsStore = createClientsStore();
