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
import { Divider } from "../components/Divider";
import { Button, ButtonGroup } from "../components/Form";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { PlugText } from "../components/Plugs";
import { Title } from "../components/Title";

import { formatRelative } from "../helpers/date";
import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import type { Client as ClientStruct } from "../storage/client";
import { useStore } from "../stores";

function PlugData() {
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
				</CardList>
			</Card>
		</div>
	);
}

type ClientCardProps = {
	client: ClientStruct | undefined;
	additionalInfo: { name: string; value: string | number }[];
};

function ClientCard({ client, additionalInfo }: ClientCardProps) {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardAvatar>
						<Avatar size="large" name={client?.name} imageSrc={client?.avatar} />
					</CardAvatar>
					<CardInfo>
						<CardMainRow>{client?.name}</CardMainRow>
						<CardSecondRow>{client?.description.trim() || "Описание отсутствует"}</CardSecondRow>
					</CardInfo>
				</CardHeader>
				<Divider margin="5px 0" />
				<CardList>
					<For each={additionalInfo}>{({ name, value }) => <CardListItem name={name} value={value} />}</For>
				</CardList>
			</Card>
		</div>
	);
}

function ClientTitle() {
	return (
		<Title
			leftChildren={
				<button onClick={() => history.back()}>
					<BsArrowLeft size={24} />
				</button>
			}
			title="Профиль клиента"
		/>
	);
}

export function Client() {
	const { id } = useParams();
	const { clients, fetchAdditionalInfo, toArchive } = useStore("clients");
	const navigate = useNavigate();

	const client = createMemo(() => clients.list.find(client => client.id === id));
	const additionalInfo = fetchAdditionalInfo(id);

	function handleDelete() {
		const onArchived = () => navigate("/clients");
		confirm("Действительно архивировать клиента?") && toArchive(String(client()?.id), onArchived);
	}

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

	return (
		<Layout title={<ClientTitle />} navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Transition mode="outin" onEnter={transitionOnEnter(300)} onExit={transitionOnExit(300)}>
					{clients.isLoading || additionalInfo.isLoading ? (
						<PlugData />
					) : (
						<ClientCard additionalInfo={additionalInfoList()} client={client()} />
					)}
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
