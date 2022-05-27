import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { createMemo } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
import { Button } from "../components/Form";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { PlugText } from "../components/Plugs";
import Title from "../components/Title";
import { formatRelative } from "../helpers/date";
import { clientsStore } from "../stores/clients";
import styles from "./Client.module.css";

function ClientPlug() {
	return (
		<div>
			<div className={styles.card}>
				<div className={styles.cardAvatar}>
					<Avatar size="large" isPlug={true} />
				</div>
				<div className={styles.cardInfo}>
					<div className={styles.cardInfoName}>
						<PlugText />
					</div>
					<div className={styles.cardInfoDescription}>
						<PlugText size={100} />
					</div>
				</div>
			</div>
			<div className={styles.statistic}>
				<div className={styles.statisticItem}>
					<PlugText size={160} />
					<PlugText size={50} />
				</div>
			</div>
		</div>
	);
}

export function Client() {
	const { id } = useParams();
	const { clients, fetchAdditionalInfo } = clientsStore;
	const navigate = useNavigate();

	const client = createMemo(() => clients.list.find(client => client.id === id));
	const additionalInfo = fetchAdditionalInfo(id);

	const handleDelete = () => {
		clientsStore.toArchive(client()?.id || "", () => {
			navigate("/clients");
		});
	};

	const ClientCard = () => {
		return (
			<div>
				<div className={styles.card}>
					<div className={styles.cardAvatar}>
						<Avatar size="large" name={client()?.name} imageSrc={client()?.avatar} />
					</div>
					<div className={styles.cardInfo}>
						<div className={styles.cardInfoName}>{client()?.name}</div>
						<div className={styles.cardInfoDescription}>
							{client()?.description.trim() || "Описание отсутствует"}
						</div>
					</div>
				</div>
				<div className={styles.statistic}>
					<div className={styles.statisticItem}>
						<div>Дата создания</div>
						<div>{formatRelative(client()?.createdAt.toDate())}</div>
					</div>
					<div className={styles.statisticItem}>
						<div>Всего посещений</div> <div>{additionalInfo.countRecords}</div>
					</div>
					<div className={styles.statisticItem}>
						<div>Последняя запись</div>
						<div>
							{additionalInfo.latestRecord
								? formatRelative(additionalInfo.latestRecord?.toDate())
								: "Нет записей"}
						</div>
					</div>
				</div>
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
			navBar={<NavBar />}
		>
			<Paper autoHeight={true}>
				<Transition
					mode="outin"
					onEnter={(el, done) => {
						const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
						a.finished.then(done);
					}}
					onExit={(el, done) => {
						const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
						a.finished.then(done);
					}}
				>
					{clients.isLoading || additionalInfo.isLoading ? <ClientPlug /> : <ClientCard />}
				</Transition>
			</Paper>

			<div className={styles.actions}>
				<Button fullWidth={true}>Создать запись</Button>
				<Button onClick={() => navigate(`/client/edit/${client()?.id}`)} fullWidth={true}>
					Редактировать
				</Button>
				<Button onClick={handleDelete} fullWidth={true} type="danger">
					Архивировать
				</Button>
			</div>
		</Layout>
	);
}
