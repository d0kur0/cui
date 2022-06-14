import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

import { db } from "../firebase";
import { userStore } from "../stores/user";

export type Record = {
	id: string;
	date: Timestamp;
	userId: string;
	clientId: string;
	serviceIds: string[];
	createdAt: Timestamp;
	description: string;
};

// getAllOfMonth
type GetAllOfMonthProps = {
	userId: string;
	startDate: Date;
	endDate: Date;
};

async function getAllOfMonth(props: GetAllOfMonthProps): Promise<Record[]> {
	const _query = query(
		collection(db, "records"),
		where("userId", "==", props.userId),
		where("date", ">=", props.startDate),
		where("date", "<=", props.endDate)
	);
	const { docs } = await getDocs(_query);
	return docs.map(doc => ({ id: doc.id, ...doc.data() } as Record));
}

// create
export type CreateProps = {
	date: Date;
	clientId: string;
	serviceIds: string[];
	description: string;
};

async function create({ clientId, serviceIds, date, description }: CreateProps): Promise<Record> {
	const recordObject = {
		date: Timestamp.fromDate(date),
		userId: userStore.user.id,
		clientId,
		createdAt: Timestamp.now(),
		deletedAt: null,
		serviceIds,
		description,
	};

	const newRecord = await addDoc(collection(db, "records"), recordObject);
	return { ...recordObject, id: newRecord.id };
}

// update
export type UpdateProps = {
	date: Date;
	clientId: string;
	recordId: string;
	serviceIds: string[];
	description: string;
};

async function update({ recordId, date, serviceIds, description, clientId }: UpdateProps): Promise<Record> {
	const recordRef = doc(collection(db, "records"), recordId);
	const recordSnap = await getDoc(recordRef);
	const record = { ...recordSnap.data() } as Record;

	record.date = Timestamp.fromDate(date);
	record.clientId = clientId;
	record.serviceIds = serviceIds;
	record.description = description;

	await updateDoc(recordRef, record);
	return { ...record, id: recordSnap.id };
}

export const recordStorage = {
	getAllOfMonth,
	create,
	update,
};
