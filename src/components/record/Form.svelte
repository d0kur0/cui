<script>
import { SET_ERROR_MESSAGE } from "../../stores/common";
import { useStoreon } from "@storeon/svelte";
import { format } from "date-fns";
import { createEventDispatcher } from "svelte";

import Input from "../Input.svelte";
import Button from "../Button.svelte";
import FormItem from "../FormItem.svelte";
import ClientPicker from "../client/Picker.svelte";
import ServicesSelecter from "../service/Picker.svelte";
import ImportantMessage from "../ImportantMessage.svelte";

const dispatchEvent = createEventDispatcher();
const { dispatch, clients, services, recordsDate } = useStoreon(
  "clients",
  "services",
  "recordsDate"
);

export let record = { description: "", clientId: "", serviceIds: [], date: $recordsDate };
export let buttonText = "Создать";

$: recordClient = $clients.find(({ id }) => id === record.clientId);
$: recordServices = $services.filter(({ id }) => record.serviceIds.includes(id));
$: recordDate =
  (record.date &&
    record.date instanceof Date &&
    format(record.date, "yyyy-MM-dd'T'HH:mm")) ||
  "";

function handleSubmit() {
  if (!record.serviceIds.length) {
    return dispatch(SET_ERROR_MESSAGE, "Выберите услуги");
  }

  if (!record.clientId) {
    return dispatch(SET_ERROR_MESSAGE, "Выберите клиента");
  }

  dispatchEvent("submit", { record });
}

function handleInputDate({ target }) {
  record.date = new Date(target.value);
}

function handleSelectClient({ detail }) {
  record.clientId = detail.clientId;
}

function handleSelectServices({ detail }) {
  record.serviceIds = detail.serviceIds;
}

function handleInputDescription({ target }) {
  record.description = target.value;
}
</script>

{#if !$clients?.length}
  <ImportantMessage>
    У вас не создано ни одного клиента, для создания записи создайте хотя бы одного.
  </ImportantMessage>
{/if}

{#if !$services?.length}
  <ImportantMessage>
    У вас не создано ни одной услуги, для создания записи создайте хотя бы одну.
  </ImportantMessage>
{/if}

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <ClientPicker selectedClient="{recordClient}" on:input="{handleSelectClient}" />
  </FormItem>

  <FormItem>
    <ServicesSelecter
      selectedServices="{recordServices}"
      on:input="{handleSelectServices}" />
  </FormItem>

  <FormItem>
    <Input
      on:change="{handleInputDate}"
      required="{true}"
      value="{recordDate}"
      placeholder="Выберите дату"
      type="datetime-local"
      label="Дата записи"
      name="date" />
  </FormItem>

  <FormItem>
    <Input
      on:change="{handleInputDescription}"
      value="{record.description}"
      placeholder="Нужен топ без липкого слоя"
      type="text"
      label="Примечание к клиенту"
      name="description" />
  </FormItem>

  <FormItem>
    <Button fullWidth="{true}">{buttonText}</Button>
  </FormItem>
</form>
