import { format } from "date-fns";
import { Link } from "solid-app-router";
import { For, createMemo } from "solid-js";

import { Avatar } from "../components/Avatar";
import { Badge, BadgeGrid } from "../components/Badge";
import Calendar from "../components/Calendar";
import { Card, CardAvatar, CardHeader, CardInfo, CardMainRow, CardSecondRow } from "../components/Card";
import Layout from "../components/Layout";
import { List, ListItem, ListItemBetweenContent } from "../components/List";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Title from "../components/Title";
import titleStyles from "../components/Title.module.css";
import { clientsStore } from "../stores/clients";
import { recordsStore } from "../stores/records";
import { servicesStore } from "../stores/services";

function Records() {
	const { records } = recordsStore;
	const { services } = servicesStore;
	const { clients } = clientsStore;

	const currentDayRecords = createMemo(() => {
		return records.list
			.filter(
				record => format(record.date.toDate(), "dd-MM-yyyy") === format(records.currentDate, "dd-MM-yyyy")
			)
			.map(record => ({
				...record,
				services: services.list.filter(s => record.serviceIds.includes(s.id)),
				client: clients.list.find(c => c.id === record.clientId),
			}));
	});

	const dayPriceSum = createMemo(() => {
		return currentDayRecords().reduce((acc, r) => acc + r.services.reduce((acc, s) => acc + +s.price, 0), 0);
	});

	const RecordsList = () => {
		return (
			<List margin="5px 0" title={`Потенциальный доход: ${dayPriceSum()} руб.`}>
				<For each={currentDayRecords()} fallback={<ListItem content="Список пуст"></ListItem>}>
					{({ id, client, services }) => (
						<ListItem
							href={`/record/${id}`}
							content={
								<ListItemBetweenContent
									rightAlign="flex-start"
									leftContent={
										<Card>
											<CardHeader>
												<CardAvatar>
													<Avatar imageSrc={client?.avatar} name={client?.name} />
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
									}
									rightContent={`${services.reduce((acc, s) => acc + +s.price, 0)}руб.`}
								/>
							}
						/>
					)}
				</For>
			</List>
		);
	};

	return (
		<Layout
			title={
				<Title
					rightChildren={
						<Link className={titleStyles.navigateLink} href="/record/create">
							Добавить
						</Link>
					}
					title="Записи"
				/>
			}
			navBar={<NavBar />}>
			<Paper fixedContent={<Calendar />} margin="5px 0 0 0">
				{records.isLoading ? <div>Загрузка...</div> : <RecordsList />}
			</Paper>
		</Layout>
	);
}

export default Records;
