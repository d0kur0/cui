import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { HiSolidHashtag } from "solid-icons/hi";
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
import { servicesStore } from "../stores/services";

function ServicePlug() {
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

function Service() {
	const { id } = useParams();
	const { services, toArchive } = servicesStore;
	const navigate = useNavigate();

	const service = createMemo(() => services.list.find(service => service.id === id));
	const handleDelete = () => {
		confirm("Действительно ахривировать услугу?") &&
			toArchive(service()?.id || "", () => navigate("/services"));
	};

	const ClientCard = () => {
		return (
			<div>
				<Card>
					<CardHeader>
						<CardInfo>
							<CardMainRow>{service()?.name}</CardMainRow>
							<CardSecondRow>{service()?.price} руб.</CardSecondRow>
						</CardInfo>
					</CardHeader>
					<Divider margin="5px 0" />
					<CardList>
						<CardListItem name="Дата создания" value={formatRelative(service()?.createdAt.toDate())} />
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
					title="Карточка услуги"
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Transition mode="outin" onEnter={transitionOnEnter(300)} onExit={transitionOnExit(300)}>
					{services.isLoading ? <ServicePlug /> : <ClientCard />}
				</Transition>
			</Paper>

			<ButtonGroup>
				<Button onClick={() => navigate(`/service/edit/${service()?.id}`)} fullWidth={true}>
					Редактировать
				</Button>
				<Button onClick={handleDelete} fullWidth={true} type="danger">
					Архивировать
				</Button>
			</ButtonGroup>
		</Layout>
	);
}

export default Service;
