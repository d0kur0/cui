import { format, lastDayOfMonth, startOfMonth } from "date-fns";
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
		const startDate = startOfMonth(store.currentDate);
		startDate.setHours(0, 0, 0);

		const endDate = lastDayOfMonth(startDate);
		endDate.setHours(23, 59, 59);

		recordStorage
			.getAllOfMonth({ userId: userStore.user.id, startDate, endDate })
			.then(records => setStore(store => ({ ...store, list: records })))
			.catch(error => pushError(error.message))
			.finally(() => setStore("isLoading", false));
	};

	const setCurrentDate = (date: Date) => {
		const isMonthChanged = format(date, "MM-yyyy") !== format(store.currentDate, "MM-yyyy");
		setStore("currentDate", date);
		isMonthChanged && (setStore("isLoading", true), fetchCurrentMonth());
	};

	const create = () => {};

	const update = () => {};

	return { records: store, fetchCurrentMonth, setCurrentDate, create, update };
}

export const recordsStore = createRecordsStore();
