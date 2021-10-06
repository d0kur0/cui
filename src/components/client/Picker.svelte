<style src="./Picker.css"></style>

<script>
import { fade } from "svelte/transition";
import { useStoreon } from "@storeon/svelte";
import { createEventDispatcher } from "svelte";

import List from "../List.svelte";
import Title from "../Title.svelte";
import Avatar from "../Avatar.svelte";
import SearchBar from "../SearchBar.svelte";
import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
import EmptyMessage from "../EmptyMessage.svelte";

export let selectedClient;

let isModalOpen = false;
let searchQuery = "";

const dispatch = createEventDispatcher();
const { clients } = useStoreon("clients");

$: filteredClients = $clients.filter(
	({ name, description }) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		description.toLowerCase().includes(searchQuery.toLowerCase())
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

function handleSelectClient({ event, client }) {
	event.preventDefault();
	selectedClient = client;
	isModalOpen = false;
	dispatch("input", { clientId: client.id });
}

function handleCancelClient(event) {
	event.preventDefault();
	selectedClient = undefined;
	dispatch("input", { clientId: undefined });
}
</script>

<div class="input">
	<div class="input__label">Выберите клиента</div>
	{#if selectedClient}
		<div class="client">
			<Avatar initials="{selectedClient.name}" />
			<div class="client__info">
				{selectedClient.name}
				<div>
					<button on:click="{handleCancelClient}" class="client__cancel-button">
						Убрать
					</button>
				</div>
			</div>
		</div>
	{:else}
		<button on:click="{handleOpenList}" class="input__input">Не выбран</button>
	{/if}
</div>

{#if isModalOpen}
	<div class="modal" transition:fade="{{ duration: 200 }}">
		<div class="modal__close-button-wrapper">
			<button on:click="{handleCloseList}" class="modal__close-button">
				<IoIosClose />
			</button>
		</div>
		<Title title="Выбор клиента" />
		<SearchBar on:input="{handleSearchInput}" />
		{#if filteredClients.length}
			<List items="{filteredClients}" let:item>
				<li>
					<button
						on:click="{event => handleSelectClient({ event, client: item })}"
						class="list__event-button">select client</button>

					<div class="list__item-avatar">
						<Avatar initials="{item.name}" />
					</div>
					<div class="list__item">
						<div class="list__item-content">
							<h2>{item.name}</h2>
							<h3>{item.description}</h3>
						</div>
					</div>
				</li>
			</List>
		{:else}
			<EmptyMessage />
		{/if}
	</div>
{/if}
