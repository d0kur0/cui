import { createStore } from "solid-js/store";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

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

const initialValue = {
	isLoading: true,
	list: [],
};

export function useClientsStore(userId: string) {
	const [clients, setClients] = createStore<ClientsStore>(initialValue);

	const clientsQuery = query(collection(db, "clients"), where("userId", "==", userId));

	getDocs(clientsQuery).then(querySnapshot => {
		const clientsList = querySnapshot.docs.map(doc => doc.data() as Client);
		console.log(clientsList);
		setClients({ ...clients, list: clientsList, isLoading: false });
	});

	return {
		clients,
	};
}
