import { format, isEqual, lastDayOfMonth, startOfMonth } from "date-fns";
import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { Record, recordStorage } from "../storage/record";
import { notificationsStore } from "./notifications";
import { userStore } from "./user";

const { pushError } = notificationsStore;

type RecordsStore = StaticStoreProps & {
	currentDate: Date;
	list: Record[];
};

function createRecordsStore() {
	const [store, setStore] = createStore<RecordsStore>({
		currentDate: new Date(),
		isLoading: true,
		list: [],
	});

	const fetchCurrentMonth = () => {
		console.log(store.currentDate);
		const startDate = startOfMonth(store.currentDate);
		startDate.setHours(0, 0, 0);

		const endDate = lastDayOfMonth(startDate);
		endDate.setHours(23, 59, 59);

		recordStorage
			.getAllOfMonth({ userId: userStore.user.id, startDate, endDate })
			.then(records => setStore(store => ({ ...store, list: records, isLoading: false })))
			.catch(error => pushError(error.message));
	};

	const setCurrentDate = (date: Date) => {
		const isMonthChanged = format(date, "dd-MM-yyyy") !== format(store.currentDate, "dd-MM-yyyy");
		setStore("currentDate", date);
		isMonthChanged && (setStore("isLoading", true), fetchCurrentMonth());
	};

	return { records: store, fetchCurrentMonth, setCurrentDate };
}

export const recordsStore = createRecordsStore();
