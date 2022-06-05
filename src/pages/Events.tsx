import { format } from "date-fns";
import { FiPlusSquare } from "solid-icons/fi";
import { HiSolidHashtag } from "solid-icons/hi";
import { For, createMemo } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
import Calendar from "../components/Calendar";
import { Card, CardAvatar, CardHeader, CardInfo, CardMainRow, CardSecondRow } from "../components/Card";
import Layout from "../components/Layout";
import { List, ListItem, ListItemBetweenContent } from "../components/List";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Title from "../components/Title";
import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import { clientsStore } from "../stores/clients";
import { recordsStore } from "../stores/records";
import { servicesStore } from "../stores/services";

function Events() {
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

	const RecordsList = () => {
		return (
			<List>
				<For each={currentDayRecords()} fallback={<ListItem content="Список пуст"></ListItem>}>
					{({ id, client, services }) => (
						<ListItem
							href={`/record/${id}`}
							content={
								<ListItemBetweenContent
									leftContent={
										<Card>
											<CardHeader>
												<CardAvatar>
													<Avatar size="large" imageSrc={client?.avatar} name={client?.name} />
												</CardAvatar>
												<CardInfo>
													<CardMainRow>{client?.name}</CardMainRow>
													<CardSecondRow>
														<For each={services}>{service => <span>{service.name}</span>}</For>
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
						<button>
							<FiPlusSquare size={28} />
						</button>
					}
					title="Записи"
				/>
			}
			navBar={<NavBar />}>
			<Paper fixedContent={<Calendar />} margin="5px 0 0 0">
				<Transition mode="outin" onEnter={transitionOnEnter()} onExit={transitionOnExit()}>
					{records.isLoading ? <div></div> : <RecordsList />}
				</Transition>
			</Paper>
		</Layout>
	);
}

export default Events;
