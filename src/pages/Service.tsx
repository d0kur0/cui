import { useNavigate, useParams } from "solid-app-router";
import { createMemo } from "solid-js";

import { clientsStore } from "../stores/clients";
import { servicesStore } from "../stores/services";

function Service() {
	const { id } = useParams();
	const { services } = servicesStore;
	const navigate = useNavigate();

	const service = createMemo(() => services.list.find(service => service.id === id));

	const handleDelete = () => {
		clientsStore.toArchive(service()?.id || "", () => {
			navigate("/services");
		});
	};

	const ServiceCard = () => {
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
}

export default Service;
