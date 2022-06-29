import { Show, createSignal } from "solid-js";

import { Client } from "../storage/client";
import { clientsStore } from "../stores/clients";
import { Avatar } from "./Avatar";
import { Card, CardAvatar, CardHeader, CardInfo, CardMainRow, CardSecondRow } from "./Card";
import ModalPicker from "./ModalPicker";
import styles from "./Pickers.module.css";

function ClientPicker() {
	const { clients } = clientsStore;

	const [isOpen, setIsOpen] = createSignal(false);
	const [selectedClient, setSelectedClient] = createSignal<undefined | Client>();

	const handleOpenModal = () => {
		setIsOpen(true);
		setSelectedClient(undefined);
	};

	const handleChoice = (ids: string[]) => {
		const [clientId] = ids;
		setIsOpen(false);
		setSelectedClient(clients.list.find(client => client.id === clientId));
	};

	return (
		<div className={styles.wrapper}>
			<Show when={isOpen()}>
				<ModalPicker
					title="Выберите клиента"
					elements={clientsStore.clients.list}
					multiple={false}
					onChoice={handleChoice}
				/>
			</Show>

			<Show when={!selectedClient()}>
				<button type="button" onClick={handleOpenModal} className={styles.choiceButton}>
					Выберите клиента
				</button>
			</Show>

			<Show when={selectedClient()}>
				<div className={styles.input}>
					<Card>
						<CardHeader>
							<CardAvatar>
								<Avatar name={selectedClient()?.name} imageSrc={selectedClient()?.avatar}></Avatar>
							</CardAvatar>
							<CardInfo>
								<CardMainRow>{selectedClient()?.name}</CardMainRow>
								<CardSecondRow>
									<button onClick={handleOpenModal} className={styles.choiceAnotherButton} type="button">
										Выбрать другого
									</button>
								</CardSecondRow>
							</CardInfo>
						</CardHeader>
					</Card>
				</div>
			</Show>
			<input name="clientId" type="hidden" value={selectedClient()?.id} />
		</div>
	);
}

export default ClientPicker;
