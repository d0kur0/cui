import { endOfMonth, format, getDate, startOfMonth } from "date-fns";
import { db } from "../firebase";

const COLLECTION = "records";

const getPersistentKey = date => {
	try {
		return `cached-month-records_${format(date, "LL-yyyy")}`;
	} catch (error) {
		console.warn("error on getPersistentKey of statistic");
		console.error(error);
		return null;
	}
};

export const statisticGetMonthRecords = async ({ userId, date, endDateAsToday }) => {
	const startDate = startOfMonth(date);
	startDate.setHours(0, 0, 0);

	const endDate = endDateAsToday ? new Date() : endOfMonth(date);
	endDate.setHours(23, 59, 59);

	const resource = await db
		.collection(COLLECTION)
		.where("userId", "==", userId)
		.where("date", ">=", startDate)
		.where("date", "<=", endDate)
		.get();

	return resource.docs.map(doc => {
		const record = doc.data();
		return { ...record, date: record.date.toDate(), createdAt: record.date.toDate() };
	});
};

export const statisticGetMonthDaysCount = ({ records }) => {
	if (!records) return;

	return records.reduce((acc, { date }) => {
		const dayOfMonth = getDate(date);
		acc[dayOfMonth] = (acc?.[dayOfMonth] || 0) + 1;
		return acc;
	}, {});
};

export const statisticGetCounters = ({ records, services }) => {
	if (!records) return;

	return {
		records: records.length,
		money: records.reduce((acc, record) => {
			const recordServices = services.filter(service =>
				record.serviceIds.includes(service.id)
			);

			return acc + recordServices.reduce((acc, { price }) => acc + +price, 0);
		}, 0),
	};
};

export const statisticGetMonthRecordsFromCache = ({ date }) => {
	const persistentKey = getPersistentKey(date);
	const cachedMonthRecordsAsJson = localStorage.getItem(persistentKey);

	if (cachedMonthRecordsAsJson) {
		try {
			const cachedMonthRecords = JSON.parse(cachedMonthRecordsAsJson);
			return cachedMonthRecords.map(record => {
				return {
					...record,
					date: new Date(record.date),
					createdAt: new Date(record.createdAt),
				};
			});
		} catch (error) {
			console.warn("error on statisticGetMonthRecordsFromCache");
			console.error(error);
			return [];
		}
	}
};
