import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { ref } from "firebase/storage";

import { db, storage } from "../firebase";
import { notificationsStore } from "../stores/notifications";
import { userStore } from "../stores/user";

export type Client = {
	id: string;
	name: string;
	userId: string;
	createdAt: Timestamp;
	description: string;
};

export type ClientAdditionalInfo = {
	latestRecord: Timestamp | null;
	countRecords: number;
};

// fetchAllOwnedByUser
async function fetchAllOwnedByUser(userId: string): Promise<Client[]> {
	const _query = query(collection(db, "clients"), where("userId", "==", userId));
	const { docs } = await getDocs(_query);
	return docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
}

// fetchAdditionalInfo
export type FetchAdditionalInfoProps = {
	clientId: string;
	userId: string;
};

async function fetchAdditionalInfo({
	userId,
	clientId,
}: FetchAdditionalInfoProps): Promise<ClientAdditionalInfo> {
	const _query = query(
		collection(db, "records"),
		where("clientId", "==", clientId),
		where("userId", "==", userId),
		orderBy("createdAt", "asc")
	);

	const { docs } = await getDocs(_query);

	return {
		countRecords: docs.length,
		latestRecord: docs.pop()?.data()?.createdAt || null,
	};
}

// create
export type CreateProps = {
	name: string;
	avatar: File;
	description: string;
};

async function create({ name, description, avatar }: CreateProps): Promise<Client> {
	const clientObject = {
		name,
		userId: userStore.user.id,
		avatar: "",
		createdAt: Timestamp.now(),
		description,
	};

	const newClient = await addDoc(collection(db, "clients"), clientObject);

	return { ...clientObject, id: newClient.id };
}

export const clientStorage = { fetchAllOwnedByUser, fetchAdditionalInfo, create };
