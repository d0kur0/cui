import { endOfMonth, startOfMonth } from "date-fns";
import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { Record } from "../storage/record";
import { notificationsStore } from "./notifications";
import { recordsStore } from "./records";

type Store = { records: Record[]; range: { start: Date; end: Date } } & StaticStoreProps;

const { pushError } = notificationsStore;
const errorHandler = (err: Error) => pushError(err.message);

export function statisticsFactory() {
	const [store, setStore] = createStore<Store>({
		range: {
			end: endOfMonth(recordsStore.records.currentDate),
			start: startOfMonth(recordsStore.records.currentDate),
		},
		records: [],
		isLoading: true,
	});

	const setRecords = (records: Record[]) => {
		setStore("records", records);
		setStore("isLoading", false);
	};

	const setStartDate = (start: Date) => {
		setStore("range", range => ({ ...range, start }));
	};

	const setEndDate = (end: Date) => {
		setStore("range", range => ({ ...range, end }));
	};

	return {
		statistics: store,
		setRecords,
		setEndDate,
		setStartDate,
	};
}

export const statisticsStore = statisticsFactory();
