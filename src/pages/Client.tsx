import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { For, createMemo } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
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

function ClientPlug() {
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
							<PlugText size={100} />
						</CardSecondRow>
					</CardInfo>
				</CardHeader>
				<Divider margin="5px 0" />
				<CardList>
					<CardListItem name={<PlugText size={160} />} value={<PlugText size={50} />} />
				</CardList>
			</Card>
		</div>
	);
}

export function Client() {
	const { id } = useParams();
	const { clients, fetchAdditionalInfo, toArchive } = clientsStore;
	const navigate = useNavigate();

	const client = createMemo(() => clients.list.find(client => client.id === id));
	const additionalInfo = fetchAdditionalInfo(id);
	const handleDelete = () => {
		confirm("Действительно архивировать клиента?") &&
			toArchive(client()?.id || "", () => navigate("/clients"));
	};

	const additionalInfoList = createMemo(
		() => [
			{
				name: "Дата создания",
				value: formatRelative(client()?.createdAt.toDate()),
			},
			{
				name: "Всего посещений",
				value: additionalInfo.countRecords,
			},
			{
				name: "Последняя запись",
				value: additionalInfo.latestRecord
					? formatRelative(additionalInfo.latestRecord?.toDate())
					: "Нет записей",
			},
		],
		[additionalInfo]
	);

	const ClientCard = () => {
		return (
			<div>
				<Card>
					<CardHeader>
						<CardAvatar>
							<Avatar size="large" name={client()?.name} imageSrc={client()?.avatar} />
						</CardAvatar>
						<CardInfo>
							<CardMainRow>{client()?.name}</CardMainRow>
							<CardSecondRow>{client()?.description.trim() || "Описание отсутствует"}</CardSecondRow>
						</CardInfo>
					</CardHeader>
					<Divider margin="5px 0" />
					<CardList>
						<For each={additionalInfoList()}>
							{({ name, value }) => <CardListItem name={name} value={value} />}
						</For>
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
					title="Профиль клиента"
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Transition mode="outin" onEnter={transitionOnEnter(300)} onExit={transitionOnExit(300)}>
					{clients.isLoading || additionalInfo.isLoading ? <ClientPlug /> : <ClientCard />}
				</Transition>
			</Paper>

			<ButtonGroup>
				<Button fullWidth={true}>Создать запись</Button>
				<Button onClick={() => navigate(`/client/edit/${client()?.id}`)} fullWidth={true}>
					Редактировать
				</Button>
				<Button onClick={handleDelete} fullWidth={true} type="danger">
					Архивировать
				</Button>
			</ButtonGroup>
		</Layout>
	);
}
