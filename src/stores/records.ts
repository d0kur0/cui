import { format, lastDayOfMonth, startOfMonth } from "date-fns";
import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { CreateProps, Record, UpdateProps, recordStorage } from "../storage/record";
import { notificationsStore } from "./notifications";
import { userStore } from "./user";

type RecordsStore = StaticStoreProps & {
	currentDate: Date;
	list: Record[];
};

const { create, update, toArchive } = recordStorage;
const { pushSuccess, pushError } = notificationsStore;

const errorHandler = (err: Error) => pushError(err.message);

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
			.catch(errorHandler)
			.finally(() => setStore("isLoading", false));
	};

	const setCurrentDate = (date: Date) => {
		const isMonthChanged = format(date, "MM-yyyy") !== format(store.currentDate, "MM-yyyy");
		setStore("currentDate", date);
		isMonthChanged && (setStore("isLoading", true), fetchCurrentMonth());
	};

	const createRecord = (props: CreateProps, onCreateCallback?: () => void) => {
		const onCreate = (record: Record) => {
			setStore("list", records => [record, ...records]);
			pushSuccess("Запись создана");
			onCreateCallback?.();
		};

		create(props).then(onCreate, errorHandler);
	};

	const updateRecord = (props: UpdateProps, onUpdateCallback?: () => void) => {
		const onUpdate = (record: Record) => {
			setStore("list", records => records.map(r => (record.id === r.id ? record : r)));
			pushSuccess("Запись обновлена");
			onUpdateCallback?.();
		};

		update(props).then(onUpdate, errorHandler);
	};

	const toArchiveRecord = (recordId: string, onArchiveCallback?: () => void) => {
		const onArchived = () => {
			setStore("list", records => records.filter(r => r.id !== recordId));
			onArchiveCallback?.();
			pushSuccess("Запись удалена");
		};

		toArchive(recordId).then(onArchived, errorHandler);
	};

	return {
		records: store,
		fetchCurrentMonth,
		setCurrentDate,
		create: createRecord,
		update: updateRecord,
		toArchive: toArchiveRecord,
	};
}

export const recordsStore = createRecordsStore();
