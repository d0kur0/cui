import { Match, Switch, createEffect, createMemo, onMount } from "solid-js";

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

	return (
		<Layout title={<Title title="Статистика" />} navBar={<NavBar />}>
			<Paper>
				<Switch>
					<Match when={statistics.isLoading}>Загрузка...</Match>
					<Match when={!statistics.isLoading}>статистика {statistics.records.length}</Match>
				</Switch>
			</Paper>
		</Layout>
	);
}
