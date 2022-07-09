import { JSX } from "solid-js";

import styles from "./SearchBar.module.css";

type SearchBarProps = {
	onInput?: (value: string) => void;
	invertColor?: boolean;
};

function SearchBar(props: SearchBarProps) {
	const onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = event => {
		props.onInput && props.onInput(event.currentTarget.value);
	};

	return (
		<div class={`${styles.searchBar} ${props.invertColor && styles.searchBarInvert}`}>
			<input onInput={onInput} class={styles.searchBarInput} type="search" placeholder="Поиск" />
		</div>
	);
}

export default SearchBar;
