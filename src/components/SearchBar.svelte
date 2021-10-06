<style src="./SearchBar.css"></style>

<script>
import IoMdSearch from "svelte-icons/io/IoMdSearch.svelte";
import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
import { createEventDispatcher } from "svelte";

let searchInput;
let searchValue;

const emmit = createEventDispatcher();

const handleClearInput = () => {
	if (searchInput) {
		searchValue = "";
		searchInput.focus();
		searchInput.value = "";
		emmit("input", { value: "" });
	}
};

const handleInputValue = ({ target }) => {
	emmit("input", { value: target.value });
};
</script>

<div class="searchbar">
	<div class="searchbar__fake-input">
		<div class="searchbar__leading-icon">
			<IoMdSearch />
		</div>

		<input
			type="text"
			bind:value="{searchValue}"
			on:change="{handleInputValue}"
			on:input="{handleInputValue}"
			bind:this="{searchInput}"
			placeholder="Поиск"
			class="searchbar__input" />

		<div
			on:click="{handleClearInput}"
			class="searchbar__clear-button"
			class:searchbar__clear-button--active="{searchValue?.length}">
			<IoIosClose />
		</div>
	</div>
</div>
