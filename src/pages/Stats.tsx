import { FaSolidMoneyBill } from "solid-icons/fa";
import { FaSolidUsersLine } from "solid-icons/fa";
import { HiSolidHashtag } from "solid-icons/hi";
import { TbDisabled2 } from "solid-icons/tb";
import { For, Match, Switch, createEffect, createMemo } from "solid-js";

import { Badge } from "../components/Badge";
import { DateRange } from "../components/DateRange";
import { Layout } from "../components/Layout";
import { List, ListItem, ListItemBetweenContent } from "../components/List";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { PlugText } from "../components/Plugs";
import { Title } from "../components/Title";

import { StatisticDateRange } from "../stores/statistics";

import { Service } from "../storage/service";
import { useStore } from "../stores";

export function Stats() {
	const { statistics, setDateRange, fetchStatistic } = useStore("statistics");
	const { services } = useStore("services");

	createEffect(() => fetchStatistic());

	const recordsCount = createMemo(() => statistics.records.length);

	const recordsWithServices = createMemo(() =>
		statistics.records.map(record => ({
			...record,
			services: services.list.filter(s => record.serviceIds.includes(s.id)),
		}))
	);

	const totalMoney = createMemo(() =>
		recordsWithServices().reduce(
			(acc, record) => acc + record.services.reduce((acc, { price }) => acc + +price, 0),
			0
		)
	);

	const servicesCount = createMemo(() => statistics.records.reduce((acc, r) => acc + r.serviceIds.length, 0));

	const mostUseServices = createMemo(() =>
		recordsWithServices()
			.reduce((acc, { services }) => {
				services.forEach(service => {
					const serviceExists = acc.findIndex(s => s.service.id === service.id);
					serviceExists > -1 ? (acc[serviceExists].count += 1) : acc.push({ service, count: 1 });
				});

				return acc;
			}, [] as { service: Service; count: number }[])
			.sort((a, b) => b.count - a.count)
	);

	const statisticList = createMemo(() => [
		{ title: "Суммарный доход", value: `${totalMoney()} руб.`, icon: <FaSolidMoneyBill /> },
		{ title: "Количество записей", value: recordsCount(), icon: <FaSolidUsersLine /> },
		{ title: "Оказано суммарно услуг", value: servicesCount(), icon: <TbDisabled2 /> },
	]);

	const handleDatesChange = (dateRange: StatisticDateRange) => {
		setDateRange(dateRange);
	};

	const Plug = () => {
		return (
			<>
				<Paper autoHeight={true} margin="15px 0 0 0">
					<List title="Общая статистика" margin="5px 0">
						<For each={statisticList()} fallback={<ListItem content="Список пуст"></ListItem>}>
							{({ title, value, icon }) => (
								<ListItem
									content={
										<ListItemBetweenContent
											leftContent={
												<>
													{icon} <PlugText width={200} />
												</>
											}
											rightContent={<PlugText width={30} />}
										/>
									}
								/>
							)}
						</For>
					</List>
				</Paper>

				<Paper autoHeight={true} margin="15px 0 0 0">
					<List title="Топ популярности услуг" margin="10px 0 0 0">
						<For each={Array(5).fill(0)} fallback={<ListItem content="Список пуст"></ListItem>}>
							{() => (
								<ListItem
									content={
										<ListItemBetweenContent
											leftContent={
												<>
													<HiSolidHashtag /> <PlugText width={200} />
												</>
											}
											rightContent={<PlugText width={30} />}
										/>
									}
								/>
							)}
						</For>
					</List>
				</Paper>
			</>
		);
	};

	const Statistic = () => {
		return (
			<>
				<Paper autoHeight={true} margin="15px 0 0 0">
					<List title="Общая статистика" margin="5px 0">
						<For each={statisticList()} fallback={<ListItem content="Список пуст"></ListItem>}>
							{({ title, value, icon }) => (
								<ListItem
									content={
										<ListItemBetweenContent
											leftContent={
												<>
													{icon} {title}
												</>
											}
											rightContent={value}
										/>
									}
								/>
							)}
						</For>
					</List>
				</Paper>

				<Paper autoHeight={true} margin="15px 0 0 0">
					<List title="Топ популярности услуг" margin="10px 0 0 0">
						<For each={mostUseServices()} fallback={<ListItem content="Список пуст"></ListItem>}>
							{({ service, count }) => (
								<ListItem
									content={
										<ListItemBetweenContent
											leftContent={
												<>
													<HiSolidHashtag /> {service.name}
												</>
											}
											rightContent={`${count} раз`}
										/>
									}
								/>
							)}
						</For>
					</List>
				</Paper>
			</>
		);
	};

	return (
		<Layout title={<Title title="Статистика" />} navBar={<NavBar />}>
			<Paper autoHeight={true} margin="15px 0 0 0" padding="10px 15px">
				<DateRange onChange={handleDatesChange} start={statistics.range.start} end={statistics.range.end} />
			</Paper>

			<Switch>
				<Match when={statistics.isLoading}>
					<Plug />
				</Match>
				<Match when={!statistics.isLoading}>
					<Statistic />
				</Match>
			</Switch>
		</Layout>
	);
}
