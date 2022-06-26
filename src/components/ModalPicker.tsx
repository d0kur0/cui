import { BsCheck } from "solid-icons/bs";
import { For, Show, createMemo, createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { DeepReadonly } from "solid-js/store";
import { Portal } from "solid-js/web";

import { Avatar } from "./Avatar";
import { Button } from "./Form";
import { List, ListItem } from "./List";
import styles from "./ModalPicker.module.css";
import SearchBar from "./SearchBar";

type ModalPickerProps = {
	elements: DeepReadonly<{ id: string; name: string; avatar: string; description: string }[]>;
	multiple: boolean;
	title: string;
	onChoice?: (ids: string[]) => void;
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
		props.multiple &&
			setSelectedIds(ids => (ids.includes(id) ? ids.filter(_id => _id !== id) : [...ids, id]));
		props.multiple || setSelectedIds(() => [id]);
		props.multiple || handleChoice();
	};

	const handleChoice = () => {
		props.onChoice?.(selectedIds());
	};

	let gridStylesOverride: JSX.CSSProperties = {};
	props.multiple || (gridStylesOverride["--actionsHeight"] = "0px");

	return (
		<>
			<Portal>
				<div className={styles.overlay}></div>
			</Portal>

			<div className={styles.picker}>
				<div className={styles.container}>
					<div className={styles.grid} style={gridStylesOverride}>
						<div className={styles.searchBar}>
							<SearchBar onInput={value => setSearchQuery(value)} invertColor={true} />
						</div>

						<div className={styles.content}>
							<div className={styles.list}>
								<List title={props.title || ""} margin="5px 0">
									<For each={filteredElements()} fallback={<ListItem content="Список пуст" />}>
										{({ id, name, avatar, description }) => (
											<ListItem
												onClick={() => handleSelect(id)}
												avatar={<Avatar name={name} imageSrc={avatar} />}
												title={name}
												rightButtons={
													selectedIds().includes(id) ? (
														<span className={styles.selectedBadge}>
															<BsCheck size={24} />
														</span>
													) : (
														<></>
													)
												}
												content={description.trim() ? description : "Описание отсутствует"}
											/>
										)}
									</For>
								</List>
							</div>
						</div>
						<Show when={props.multiple}>
							<div className={styles.actions}>
								<Button onClick={handleChoice} fullWidth={true}>
									Выбрать, закрыть
								</Button>
							</div>
						</Show>
					</div>
				</div>
			</div>
		</>
	);
}

export default ModalPicker;
