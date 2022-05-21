import { createStore } from "solid-js/store";
import { db } from "../firebase";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { userStore } from "./user";

export type Client = {
	id: string;
	name: string;
	userId: string;
	createdAt: Timestamp;
	description: string;
};

export type ClientsStore = {
	isLoading: boolean;
	list: Client[];
};

export function createClientsStore() {
	const [clients, setClients] = createStore<ClientsStore>({
		isLoading: true,
		list: [],
	});

	const fetch = () => {
		const clientsQuery = query(
			collection(db, "clients"),
			where("userId", "==", userStore.user.id)
		);

		getDocs(clientsQuery).then(querySnapshot => {
			const clientsList = querySnapshot.docs.map(
				doc => ({ id: doc.id, ...doc.data() } as Client)
			);
			setClients({ ...clients, list: clientsList, isLoading: false });
		});
	};

	return {
		clients,
		fetch,
	};
}

export const clientsStore = createClientsStore();
