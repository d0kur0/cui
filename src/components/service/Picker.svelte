<style src="./Picker.css"></style>

<script>
import { fade } from "svelte/transition";
import { useStoreon } from "@storeon/svelte";
import { createEventDispatcher } from "svelte";

import List from "../List.svelte";
import Title from "../Title.svelte";
import TiTimes from "svelte-icons/ti/TiTimes.svelte";
import SearchBar from "../SearchBar.svelte";
import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
import EmptyMessage from "../EmptyMessage.svelte";
import IoIosCheckmark from "svelte-icons/io/IoIosCheckmark.svelte";

const dispatch = createEventDispatcher();
const { services } = useStoreon("services");

export let selectedServices = [];

let isModalOpen = false;
let searchQuery = "";

$: filteredServices = $services.filter(
	({ name, price }) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		price.toString().includes(searchQuery.toLowerCase())
);

function handleSearchInput({ detail }) {
	searchQuery = detail.value;
}

function handleOpenList(event) {
	event.preventDefault();
	isModalOpen = true;
}

function handleCloseList(event) {
	event.preventDefault();
	isModalOpen = false;
}

function handleSelectServices(event) {
	event.preventDefault();
	isModalOpen = false;
	dispatch("input", { serviceIds: selectedServices.map(({ id }) => id) });
}

function handleCancelService({ event, serviceId }) {
	event.preventDefault();
	selectedServices = selectedServices.filter(({ id }) => id !== serviceId);
	dispatch("input", { serviceIds: selectedServices.map(({ id }) => id) });
}

function handleSelectService({ event, service }) {
	event.preventDefault();
	const selected = selectedServices.some(({ id }) => id === service.id);
	selectedServices = selected
		? selectedServices.filter(({ id }) => id !== service.id)
		: [...selectedServices, service];
}
</script>

<div class="input">
	<div class="input__label">Выберите услуги</div>

	<button
		on:click="{handleOpenList}"
		class:input__input--bottom-margin="{selectedServices.length}"
		class="input__input">
		{selectedServices.length ? "Изменить выбор" : "Не выбраны"}
	</button>

	{#if selectedServices.length}
		<div class="services">
			{#each selectedServices as service}
				<div class="services__service">
					{service.name}
					<button
						on:click="{event => handleCancelService({ event, serviceId: service.id })}"
						class="services__cancel-button">
						<TiTimes />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if isModalOpen}
	<div class="modal" transition:fade="{{ duration: 200 }}">
		<div class="modal__close-button-wrapper">
			<button
				on:click="{handleSelectServices}"
				class:modal__select-button--hidden="{!selectedServices.length}"
				class="modal__select-button">Выбрано</button>

			<button on:click="{handleCloseList}" class="modal__close-button">
				<IoIosClose />
			</button>
		</div>

		<Title title="Выбор услуг" />
		<SearchBar on:input="{handleSearchInput}" />

		{#if filteredServices.length}
			<List items="{filteredServices}" let:item>
				<li>
					<button
						on:click="{event => handleSelectService({ event, service: item })}"
						class="list__event-button">
						Open service
					</button>

					<div class="list__item">
						<div class="list__item-content">
							<h2>{item.name}</h2>
							<h3>{item.price} рублей</h3>
						</div>
						<div class="list__item-end">
							<div
								class="checkmark"
								class:checkmark--active="{selectedServices.some(s => s.id === item.id)}">
								{#if selectedServices.some(s => s.id === item.id)}
									<IoIosCheckmark />
								{/if}
							</div>
						</div>
					</div>
				</li>
			</List>
		{:else}
			<EmptyMessage />
		{/if}
	</div>
{/if}
