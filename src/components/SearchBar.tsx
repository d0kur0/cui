import styles from "./SearchBar.module.css";
import { JSX } from "solid-js";

type SearchBarProps = {
	onInput?: (value: string) => void;
};

function SearchBar(props: SearchBarProps) {
	const onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = event => {
		props.onInput && props.onInput(event.currentTarget.value);
	};

	return (
		<div className={styles.searchBar}>
			<input
				onInput={onInput}
				className={styles.searchBarInput}
				type="search"
				placeholder="Поиск"
			/>
		</div>
	);
}

export default SearchBar;
