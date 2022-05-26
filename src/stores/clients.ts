import { createStore } from "solid-js/store";
import { db } from "../firebase";
import {
	collection,
	query,
	where,
	getDocs,
	orderBy,
	setDoc,
	doc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { userStore } from "./user";
import { StaticStoreProps } from "./index";
import { notificationsStore } from "./notifications";

export type Client = {
	id: string;
	name: string;
	userId: string;
	createdAt: Timestamp;
	description: string;
};

export type ClientInfo = {
	latestRecord: Timestamp | null;
	countRecords: number;
};

export type ClientsStore = {
	isLoading: boolean;
	list: Client[];
};

export type ClientCreateProps = {
	name: string;
	description: string;
	avatar: File;
};

export function createClientsStore() {
	const [clients, setClients] = createStore<ClientsStore>({
		isLoading: true,
		list: [],
	});

	const fetchAll = () => {
		const clientsQuery = query(
			collection(db, "clients"),
			where("userId", "==", userStore.user.id)
		);

		getDocs(clientsQuery).then(
			querySnapshot => {
				const clientsList = querySnapshot.docs.map(
					doc => ({ id: doc.id, ...doc.data() } as Client)
				);
				setClients({ ...clients, list: clientsList, isLoading: false });
			},
			error => {
				notificationsStore.pushNotification({
					type: "error",
					message: `При загрузке списка клиентов произошла ошибка (${error})`,
				});
			}
		);
	};

	const fetchClientInfo = (clientId: string) => {
		const [info, setInfo] = createStore<ClientInfo & StaticStoreProps>({
			latestRecord: null,
			countRecords: 0,
			isLoading: true,
		});

		const clientRecordsQuery = query(
			collection(db, "records"),
			where("clientId", "==", clientId),
			where("userId", "==", userStore.user.id),
			orderBy("createdAt", "asc")
		);

		getDocs(clientRecordsQuery).then(
			querySnapshot => {
				setInfo({
					...info,
					countRecords: querySnapshot.docs.length,
					latestRecord: querySnapshot.docs.pop()?.data()?.createdAt || null,
					isLoading: false,
				});
			},
			error => {
				notificationsStore.pushNotification({
					type: "error",
					message: `При загрузке информации о клиенте произошла ошибка (${error})`,
				});
			}
		);

		return info;
	};

	const createClient = ({ name, description }: ClientCreateProps) => {
		setDoc(doc(collection(db, "clients")), {
			name,
			userId: userStore.user.id,
			avatar: "-",
			createdAt: Timestamp.now(),
			description,
		}).then(
			() => {
				notificationsStore.pushNotification({
					message: "Клиент создан",
					type: "success",
				});
			},
			error => {
				notificationsStore.pushNotification({
					message: `При создании клиента произошла ошибка ${error}`,
					type: "error",
				});
			}
		);
	};

	return {
		clients,
		fetchAll,
		fetchClientInfo,
		createClient,
	};
}

export const clientsStore = createClientsStore();
