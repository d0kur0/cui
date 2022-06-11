import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

import { db } from "../firebase";
import { userStore } from "../stores/user";

export type Service = {
	id: string;
	name: string;
	price: number;
	createdAt: Timestamp;
	deletedAt: Timestamp | null;
	userId: string;
};

// fetchAllOwnedByUser
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

// create
export type CreateProps = {
	name: string;
	price: string;
};

async function create({ name, price }: CreateProps): Promise<Service> {
	const serviceObject = {
		name,
		userId: userStore.user.id,
		price: +price,
		createdAt: Timestamp.now(),
		deletedAt: null,
	};

	const newService = await addDoc(collection(db, "services"), serviceObject);
	return { ...serviceObject, id: newService.id };
}

// update
export type UpdateProps = {
	name: string;
	price: string;
	serviceId: string;
};
0;
async function update(props: UpdateProps): Promise<Service> {
	const serviceRef = doc(collection(db, "services"), props.serviceId);
	const serviceSnap = await getDoc(serviceRef);
	const service = { ...serviceSnap.data() } as Service;

	service.name = props.name;
	service.price = +props.price;

	await updateDoc(serviceRef, service);
	return { ...service, id: serviceSnap.id };
}

// toArchive
async function toArchive(serviceId: string) {
	const serviceRef = doc(collection(db, "services"), serviceId);
	await updateDoc(serviceRef, { deletedAt: Timestamp.now() });
}

export const serviceStorage = {
	fetchAllOwnedByUser,
	create,
	update,
	toArchive,
};
