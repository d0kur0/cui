import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { HiSolidHashtag } from "solid-icons/hi";
import { For, createMemo } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
import { Badge, BadgeGrid } from "../components/Badge";
import {
	Card,
	CardAvatar,
	CardHeader,
	CardInfo,
	CardList,
	CardListItem,
	CardMainRow,
	CardSecondRow,
} from "../components/Card";
import Divider from "../components/Divider";
import { Button, ButtonGroup } from "../components/Form";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { PlugText } from "../components/Plugs";
import Title from "../components/Title";
import { formatRelative } from "../helpers/date";
import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import { clientsStore } from "../stores/clients";
import { recordsStore } from "../stores/records";
import { servicesStore } from "../stores/services";

function RecordPlug() {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardAvatar>
						<Avatar size="large" isPlug={true} />
					</CardAvatar>
					<CardInfo>
						<CardMainRow>
							<PlugText />
						</CardMainRow>
						<CardSecondRow>
							<PlugText width={100} />
						</CardSecondRow>
					</CardInfo>
				</CardHeader>
				<Divider margin="5px 0" />
				<CardList>
					<CardListItem name={<PlugText width={160} />} value={<PlugText width={50} />} />
					<CardListItem name={<PlugText width={160} />} value={<PlugText width={50} />} />
				</CardList>
			</Card>
		</div>
	);
}

function Record() {
	const { id } = useParams();
	const { records, toArchive } = recordsStore;
	const navigate = useNavigate();

	const { clients } = clientsStore;
	const { services } = servicesStore;

	const record = createMemo(() => records.list.find(record => record.id === id));

	const handleDelete = () => {
		confirm("Действительно ахривировать запись?") && toArchive(record()?.id || "", () => navigate("/"));
	};

	const recordClient = createMemo(() => clients.list.find(c => c.id === record()?.clientId));
	const recordServices = createMemo(() => services.list.filter(s => record()?.serviceIds.includes(s.id)));

	const RecordCard = () => {
		return (
			<div style={{ "--align-self": "flex-start" }}>
				<Card>
					<CardHeader>
						<CardAvatar>
							<Avatar size="large" imageSrc={recordClient()?.avatar} name={recordClient()?.name} />
						</CardAvatar>
						<CardInfo>
							<CardMainRow>{recordClient()?.name}</CardMainRow>
							<CardSecondRow>
								<BadgeGrid>
									<For each={recordServices()}>{service => <Badge>{service.name}</Badge>}</For>
								</BadgeGrid>
							</CardSecondRow>
						</CardInfo>
					</CardHeader>
				</Card>
				<Card>
					<Divider margin="5px 0" />
					<CardList>
						<CardListItem name="Дата посещения" value={formatRelative(record()?.date.toDate())} />
						<CardListItem name="Дата создания" value={formatRelative(record()?.createdAt.toDate())} />
					</CardList>
				</Card>
			</div>
		);
	};

	return (
		<Layout
			title={
				<Title
					leftChildren={
						<button onClick={() => history.back()}>
							<BsArrowLeft size={24} />
						</button>
					}
					title="Карточка записи"
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Transition mode="outin" onEnter={transitionOnEnter(300)} onExit={transitionOnExit(300)}>
					{records.isLoading ? <RecordPlug /> : <RecordCard />}
				</Transition>
			</Paper>

			<ButtonGroup>
				<Button onClick={() => navigate(`/record/edit/${record()?.id}`)} fullWidth={true}>
					Редактировать
				</Button>
				<Button onClick={handleDelete} fullWidth={true} type="danger">
					Архивировать
				</Button>
			</ButtonGroup>
		</Layout>
	);
}

export default Record;
