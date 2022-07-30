import { format } from "date-fns";
import { Link } from "solid-app-router";
import { For, Match, Switch, createEffect, createMemo } from "solid-js";

import { Avatar } from "../components/Avatar";
import { Badge, BadgeGrid } from "../components/Badge";
import { Calendar } from "../components/Calendar";
import { Card, CardAvatar, CardHeader, CardInfo, CardMainRow, CardSecondRow } from "../components/Card";
import { Layout } from "../components/Layout";
import { List, ListItem, ListItemBetweenContent } from "../components/List";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { Title } from "../components/Title";
import titleStyles from "../components/modules/Title.module.css";

import { Client } from "../storage/client";
import { Record } from "../storage/record";
import { Service } from "../storage/service";
import { useStore } from "../stores";

type RecordItemProps = { record: Record & { client: Client | undefined; services: Service[] } };

function RecordItem({ record }: RecordItemProps) {
	const { id, client, services, date } = record;

	function LeftContent() {
		return (
			<Card>
				<CardHeader>
					<CardAvatar>
						<Avatar imageSrc={client?.avatar} name={client?.name} />
						<div style={{ "font-size": "0.76em", "text-align": "center", "margin-top": "10px" }}>
							{format(date.toDate() || new Date(), "HH:mm")}
						</div>
					</CardAvatar>
					<CardInfo>
						<CardMainRow>{client?.name}</CardMainRow>
						<CardSecondRow>
							<BadgeGrid>
								<For each={services}>{service => <Badge>{service.name}</Badge>}</For>
							</BadgeGrid>
						</CardSecondRow>
					</CardInfo>
				</CardHeader>
			</Card>
		);
	}

	function RightContent() {
		return <span style="padding: 10px 0;">{services.reduce((acc, s) => acc + +s.price, 0)} руб.</span>;
	}

	return (
		<ListItem
			href={`/record/${id}`}
			content={
				<ListItemBetweenContent
					rightAlign="flex-start"
					leftContent={<LeftContent />}
					rightContent={<RightContent />}
				/>
			}
		/>
	);
}

function RecordsTitle() {
	return (
		<Title
			rightChildren={
				<Link class={titleStyles.navigateLink} href="/record/create">
					Добавить
				</Link>
			}
			title="Записи"
		/>
	);
}

export function Records() {
	const { records } = useStore("records");
	const { clients } = useStore("clients");
	const { services } = useStore("services");

	function filterByCurrentDay({ date }: Record) {
		const formatForEqual = "dd-MM-yyyy";
		return format(date.toDate(), formatForEqual) === format(records.currentDate, formatForEqual);
	}

	function fillRecord(record: Record) {
		return {
			...record,
			client: clients.list.find(c => c.id === record.clientId),
			services: services.list.filter(s => record.serviceIds.includes(s.id)),
		};
	}

	// WLN26jz45Qrewb8Y8xyS

	function sortByDate(currentRecord: Record, nextRecord: Record) {
		return currentRecord.date.seconds - nextRecord.date.seconds;
	}

	const currentDayRecords = createMemo(() => {
		return records.list.filter(filterByCurrentDay).map(fillRecord).sort(sortByDate);
	});

	const dayPriceSum = createMemo(() => {
		return currentDayRecords().reduce((acc, r) => {
			return acc + r.services.reduce((acc, { price }) => acc + +price, 0);
		}, 0);
	});

	function RecordsList() {
		return (
			<List margin="5px 0" title={`Потенциальный доход: ${dayPriceSum()} руб.`}>
				<For each={currentDayRecords()} fallback={<ListItem content="Список пуст" />}>
					{record => <RecordItem record={record} />}
				</For>
			</List>
		);
	}

	return (
		<Layout title={<RecordsTitle />} navBar={<NavBar />}>
			<Paper fixedContent={<Calendar />} margin="5px 0 0 0">
				<Switch>
					<Match when={records.isLoading}>
						<div>Загрузка...</div>
					</Match>
					<Match when={!records.isLoading}>
						<RecordsList />
					</Match>
				</Switch>
			</Paper>
		</Layout>
	);
}
