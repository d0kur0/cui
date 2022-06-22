import { For, createMemo, createSignal } from "solid-js";
import { DeepReadonly } from "solid-js/store";
import { Portal } from "solid-js/web";

import { Avatar } from "./Avatar";
import { Button } from "./Form";
import { List, ListItem } from "./List";
import styles from "./ModalPicker.module.css";
import SearchBar from "./SearchBar";

type ModalPickerProps = {
	isOpen: boolean;
	elements: DeepReadonly<{ id: string; name: string; avatar: string; description: string }[]>;
	multiple: boolean;
};

function ModalPicker(props: ModalPickerProps) {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedIds, setSelectedIds] = createSignal<string[]>([]);

	const filteredElements = createMemo(() =>
		props.elements.filter(
			element =>
				element.description.toLowerCase().includes(searchQuery().toLowerCase()) ||
				element.name.toLowerCase().includes(searchQuery().toLowerCase())
		)
	);

	const handleSelect = (id: string) => {
		setSelectedIds(ids => (ids.includes(id) ? ids.filter(_id => _id !== id) : [...ids, id]));
	};

	return (
		<>
			<Portal>
				<div className={styles.overlay}></div>
			</Portal>

			<div className={styles.picker}>
				<div className={styles.container}>
					<div className={styles.grid}>
						<div className={styles.searchBar}>
							<SearchBar onInput={value => setSearchQuery(value)} invertColor={true} />
						</div>

						<div className={styles.content}>
							<div className={styles.list}>
								<List title={`Список клиентов`} margin="5px 0">
									<For each={filteredElements()} fallback={<ListItem content="Список пуст"></ListItem>}>
										{({ id, name, avatar, description }) => (
											<ListItem
												onClick={() => handleSelect(id)}
												avatar={<Avatar name={name} imageSrc={avatar} />}
												title={name}
												rightButtons={selectedIds().includes(id) ? <>s--</> : <></>}
												content={description.trim() ? description : "Описание отсутствует"}
											/>
										)}
									</For>
								</List>
							</div>
						</div>
						<div className={styles.actions}>
							<Button fullWidth={true}>Выбрать, закрыть</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ModalPicker;
