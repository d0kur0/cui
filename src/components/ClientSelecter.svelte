<style>
.input__label {
  padding-bottom: 5px;
  font-size: 0.9em;
  color: rgb(65, 65, 65);
}

.input__input {
  border: none;
  background-color: #ffd6fc;
  padding: 5px 15px;
  margin: 0;
  color: rgb(48, 48, 48);
  border-radius: 5px;
  font: inherit;
}

.modal {
  width: 100%;
  height: calc(var(--vh) * 100);
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
}

.modal__close-button-wrapper {
  padding: 15px;
  display: flex;
  justify-content: flex-end;
}

.modal__close-button {
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
}

:global(.modal__close-button > svg) {
  width: 32px;
}

.client {
  display: flex;
  align-items: center;
}

.client__info {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
}

.client__cancel-button {
  border: none;
  border-radius: 8px;
  padding: 3px 8px;
  font-size: 0.9em;
  color: rgb(53, 53, 53);
  background-color: #ffd6fc;
}
</style>

<script>
import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
import SearchBar from "./SearchBar.svelte";
import Title from "./Title.svelte";
import { fade } from "svelte/transition";
import { useStoreon } from "@storeon/svelte";
import Avatar from "../components/Avatar.svelte";
import List from "../components/List.svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";

import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

let isModalOpen = false;
let searchQuery = "";

export let selectedClient;

const handleOpenList = event => {
  event.preventDefault();
  isModalOpen = true;
};

const handleCloseList = event => {
  event.preventDefault();
  isModalOpen = false;
};

const handleSelectClient = ({ event, client }) => {
  event.preventDefault();
  selectedClient = client;
  isModalOpen = false;
  dispatch("input", { clientId: client.id });
};

const handleCancelClient = event => {
  event.preventDefault();
  selectedClient = undefined;
  dispatch("input", { clientId: undefined });
};

const { clients } = useStoreon("clients");
$: filteredClients = $clients.filter(
  ({ name, description }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    description.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleSearchInput = ({ detail }) => {
  searchQuery = detail.value;
};
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
