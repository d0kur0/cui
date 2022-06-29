import { RiSystemCloseFill } from "solid-icons/ri";
import { For, Show, createMemo, createSignal } from "solid-js";

import { Service } from "../storage/service";
import { servicesStore } from "../stores/services";
import ModalPicker from "./ModalPicker";
import styles from "./Pickers.module.css";

function ServicesPicker() {
	const { services } = servicesStore;

	const [isOpen, setIsOpen] = createSignal(false);
	const [selectedServices, setSelectedServices] = createSignal<undefined | Service[]>();

	const handleOpenModal = () => {
		setIsOpen(true);
		setSelectedServices(undefined);
	};

	const handleChoice = (ids: string[]) => {
		setIsOpen(false);
		setSelectedServices(services.list.filter(({ id }) => ids.includes(id)));
	};

	const servicesAsPickerStruct = createMemo(() =>
		services.list.map(({ id, name, price }) => ({ id, name, avatar: "", description: `${price} руб.` }))
	);

	const handleRemove = (_id: string) => {
		setSelectedServices(services => services?.filter(({ id }) => _id !== id));
	};

	return (
		<div className={styles.wrapper}>
			<Show when={isOpen()}>
				<ModalPicker
					title="Выберите услуги"
					elements={servicesAsPickerStruct()}
					multiple={true}
					onChoice={handleChoice}
					hideAvatars={true}
				/>
			</Show>

			<Show when={!selectedServices()?.length}>
				<button type="button" onClick={handleOpenModal} className={styles.choiceButton}>
					Выберите услуги
				</button>
			</Show>

			<Show when={selectedServices()?.length}>
				<div className={styles.servicesList}>
					<For each={selectedServices()}>
						{service => (
							<span className={styles.serviceBadge}>
								{service.name}
								<button onClick={() => handleRemove(service.id)} type="button">
									<RiSystemCloseFill size={18} />
								</button>
							</span>
						)}
					</For>
				</div>
			</Show>

			<input
				name="servicesIds"
				type="hidden"
				value={selectedServices()
					?.map(({ id }) => id)
					.join(",")}
			/>
		</div>
	);
}

export default ServicesPicker;
