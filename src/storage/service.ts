import { Timestamp, collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "../firebase";

export type Service = {
	id: string;
	name: string;
	price: number;
	createdAt: Timestamp;
	deletedAt: Timestamp;
	userId: string;
};

async function fetchAllOwnedByUser(userId: string): Promise<Service[]> {
	const _query = query(
		collection(db, "services"),
		where("userId", "==", userId),
		where("deletedAt", "==", null),
		orderBy("createdAt", "desc")
	);
	const { docs } = await getDocs(_query);
	return docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
}

export const serviceStorage = {
	fetchAllOwnedByUser,
};
