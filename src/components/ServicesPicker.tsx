import { RiSystemCloseFill } from "solid-icons/ri";
import { For, Show, createEffect, createMemo, createSignal } from "solid-js";

import { Service } from "../storage/service";
import { useStore } from "../stores";
import { ModalPicker } from "./ModalPicker";
import styles from "./modules/Pickers.module.css";

type ServicePickerProps = {
	defaultServiceIds?: string[];
};

export function ServicesPicker({ defaultServiceIds }: ServicePickerProps) {
	const { services } = useStore("services");

	const [isOpen, setIsOpen] = createSignal(false);
	const [selectedServices, setSelectedServices] = createSignal<undefined | Service[]>();

	createEffect(() => {
		setSelectedServices(services.list.filter(service => defaultServiceIds?.includes(service.id)));
	});

	const handleOpenModal = () => {
		setIsOpen(true);
		setSelectedServices(undefined);
	};

	const handleChoice = (ids: string[]) => {
		setIsOpen(false);
		setSelectedServices(services.list.filter(({ id }) => ids.includes(id)));
	};

	const servicesAsPickerStruct = createMemo(() =>
		services.list
			.filter(({ deletedAt }) => !deletedAt)
			.map(({ id, name, price }) => ({ id, name, avatar: "", description: `${price} руб.` }))
	);

	const handleRemove = (_id: string) => {
		setSelectedServices(services => services?.filter(({ id }) => _id !== id));
	};

	const selectedIds = createMemo(() => selectedServices()?.map(({ id }) => id));

	return (
		<div class={styles.wrapper}>
			<Show when={isOpen()}>
				<ModalPicker
					title="Выберите услуги"
					elements={servicesAsPickerStruct()}
					multiple={true}
					onChoice={handleChoice}
					hideAvatars={true}
					selectedIds={selectedIds()}
				/>
			</Show>

			<button type="button" onClick={handleOpenModal} class={styles.choiceButton}>
				<Show when={!selectedServices()?.length}>Выберите услуги</Show>
				<Show when={selectedServices()?.length}>Изменить выбор</Show>
			</button>

			<Show when={selectedServices()?.length}>
				<div class={styles.servicesList}>
					<For each={selectedServices()}>
						{service => (
							<span class={styles.serviceBadge}>
								{service.name}
								<button
									class={styles.serviceBadgeButton}
									onClick={() => handleRemove(service.id)}
									type="button">
									<RiSystemCloseFill size={18} />
								</button>
							</span>
						)}
					</For>
				</div>
			</Show>

			<input name="serviceIds" type="hidden" value={selectedIds()?.join(",")} />
		</div>
	);
}
