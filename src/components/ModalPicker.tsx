import { BsCheck } from "solid-icons/bs";
import { VscClose } from "solid-icons/vsc";
import { For, Show, createMemo, createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { Portal } from "solid-js/web";

import { Avatar } from "./Avatar";
import { Button } from "./Form";
import { List, ListItem } from "./List";
import { SearchBar } from "./SearchBar";
import styles from "./modules/ModalPicker.module.css";

type ModalPickerProps = {
	title: string;
	elements: { id: string; name: string; avatar: string; description: string }[];
	multiple: boolean;
	onChoice?: (ids: string[]) => void;
	hideAvatars?: boolean;
	selectedIds?: string[];
};

export function ModalPicker(props: ModalPickerProps) {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedIds, setSelectedIds] = createSignal<string[]>(props.selectedIds || []);

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

	const handleClose = () => {
		setSelectedIds([]);
		props.onChoice?.([]);
	};

	let gridStylesOverride: JSX.CSSProperties = {};
	props.multiple || (gridStylesOverride["--actionsHeight"] = "0px");

	return (
		<>
			<Portal>
				<div class={styles.overlay}></div>
			</Portal>

			<div class={styles.picker}>
				<div class={styles.container}>
					<div class={styles.grid} style={gridStylesOverride}>
						<div class={styles.titleBar}>
							{props.title || "Выбер элемента"}
							<button onClick={handleClose} class={styles.closeButton} type="button">
								<VscClose />
							</button>
						</div>

						<div class={styles.searchBar}>
							<SearchBar onInput={value => setSearchQuery(value)} invertColor={true} />
						</div>

						<div class={styles.content}>
							<div class={styles.list}>
								<List margin="5px 0">
									<For each={filteredElements()} fallback={<ListItem content="Список пуст" />}>
										{({ id, name, avatar, description }) => (
											<ListItem
												onClick={() => handleSelect(id)}
												avatar={props.hideAvatars ? undefined : <Avatar name={name} imageSrc={avatar} />}
												title={name}
												rightButtons={
													selectedIds().includes(id) ? (
														<span class={styles.selectedBadge}>
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
							<div class={styles.actions}>
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
