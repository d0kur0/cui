import { Timestamp, collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "../firebase";

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

export const recordStorage = {
	getAllOfMonth,
};
