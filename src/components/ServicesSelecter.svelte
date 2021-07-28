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
  cursor: pointer;
}

.input__input--bottom-margin {
  margin-bottom: 5px;
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
  justify-content: space-between;
}

.modal__close-button {
  border: none;
  background-color: transparent;
  margin: 0;
  cursor: pointer;
  padding: 0;
}

:global(.modal__close-button > svg) {
  width: 32px;
}

.modal__select-button {
  background-color: #ffd6fc;
  border: none;
  border-radius: 5px;
  padding: 3px 12px;
  margin: 0;
  opacity: 1;
  pointer-events: unset;
  transition: 0.3s;
  cursor: pointer;
}

.modal__select-button--hidden {
  transition: 0.3s;
  opacity: 0;
  pointer-events: none;
}

.checkmark {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #80b8ff;
}

.checkmark--active {
  background-color: #9ec9ff;
  color: #fff;
}

.services {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
}

.services__cancel-button {
  margin-left: 5px;
  background-color: #ffd6fc;
  color: rgb(43, 43, 43);
  border: none;
  width: 20px;
  height: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

:global(.services__cancel-button > svg) {
  width: 16px;
}

.services__service {
  margin: 4px 5px;
  background-color: #80b8ff;
  color: #fff;
  padding: 3px 8px;
  border-radius: 23px;
  display: flex;
}
</style>

<script>
import TiTimes from "svelte-icons/ti/TiTimes.svelte";
import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
import IoIosCheckmark from "svelte-icons/io/IoIosCheckmark.svelte";
import SearchBar from "./SearchBar.svelte";
import Title from "./Title.svelte";
import { fade } from "svelte/transition";
import { useStoreon } from "@storeon/svelte";
import List from "../components/List.svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";

import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

let isModalOpen = false;
let searchQuery = "";

export let selectedServices = [];

const handleOpenList = event => {
  event.preventDefault();
  isModalOpen = true;
};

const handleCloseList = event => {
  event.preventDefault();
  isModalOpen = false;
};

const handleSelectServices = event => {
  event.preventDefault();
  isModalOpen = false;
  dispatch("input", { serviceIds: selectedServices.map(s => s.id) });
};

const handleCancelService = ({ event, serviceId }) => {
  event.preventDefault();
  selectedServices = selectedServices.filter(s => s.id !== serviceId);
  dispatch("input", { serviceIds: selectedServices.map(s => s.id) });
};

const handleSelectService = ({ event, service }) => {
  event.preventDefault();
  const selected = selectedServices.some(s => s.id === service.id);
  selectedServices = selected
    ? selectedServices.filter(s => s.id !== service.id)
    : [...selectedServices, service];
};

const { services } = useStoreon("services");
$: filteredServices = $services.filter(
  ({ name, price }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    price.toString().includes(searchQuery.toLowerCase())
);

const handleSearchInput = ({ detail }) => {
  searchQuery = detail.value;
};
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
