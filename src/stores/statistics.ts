import { endOfMonth, startOfMonth } from "date-fns";
import { createStore } from "solid-js/store";

import { StaticStoreProps } from ".";
import { Record } from "../storage/record";
import { recordStorage } from "./../storage/record";
import { notificationsStore } from "./notifications";
import { recordsStore } from "./records";
import { userStore } from "./userStore";

export type StatisticDateRange = { start: Date; end: Date };
type Store = { records: Record[]; range: StatisticDateRange } & StaticStoreProps;

const { getAllOfMonth } = recordStorage;

const { pushError } = notificationsStore;
const errorHandler = (err: Error) => (pushError(err.message), console.log(err));

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

	const fetchStatistic = () => {
		setStore("isLoading", true);

		const onLoaded = (records: Record[]) => {
			setStore("records", records);
		};

		getAllOfMonth({ userId: userStore.user.id, startDate: store.range.start, endDate: store.range.end })
			.then(onLoaded, errorHandler)
			.finally(() => setStore("isLoading", false));
	};

	const setDateRange = ({ start, end }: StatisticDateRange) => {
		setStore("range", { start, end });
		fetchStatistic();
	};

	return {
		statistics: store,
		setDateRange,
		fetchStatistic,
	};
}

export const statisticsStore = statisticsFactory();
