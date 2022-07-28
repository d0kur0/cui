import { Match, Switch, createEffect, createMemo, onMount } from "solid-js";

import { DateRange } from "../components/DateRange";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { Title } from "../components/Title";

import { useStore } from "../stores";

export function Stats() {
	const { statistics, setRecords } = useStore("statistics");
	const { records } = useStore("records");

	createEffect(() => {
		statistics.records.length || setRecords(records.list);
	});

	const Statistic = () => {
		return (
			<>
				<DateRange onChange={alert} start={statistics.range.start} end={statistics.range.end} />
			</>
		);
	};

	return (
		<Layout title={<Title title="Статистика" />} navBar={<NavBar />}>
			<Paper padding="15px">
				<Switch>
					<Match when={statistics.isLoading}>Загрузка...</Match>
					<Match when={!statistics.isLoading}>
						<Statistic />
					</Match>
				</Switch>
			</Paper>
		</Layout>
	);
}
