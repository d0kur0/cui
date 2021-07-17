<script>
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import Input from "../components/Input.svelte";
import { createEventDispatcher } from "svelte";
import ClientSelecter from "./ClientSelecter.svelte";
import ServicesSelecter from "./ServicesSelecter.svelte";
import { SET_ERROR_MESSAGE } from "../stores/common";
import { useStoreon } from "@storeon/svelte";
import { format } from "date-fns";

export let record = { clientId: "", serviceIds: [], date: "" };
export let buttonText = "Создать";

const dispatchEvent = createEventDispatcher();
const { dispatch, clients, services } = useStoreon("clients", "services");

$: recordClient = $clients.find(({ id }) => id === record.clientId);
$: recordServices = $services.filter(({ id }) => record.serviceIds.includes(id));
$: recordDate =
  (record.date &&
    record.date instanceof Date &&
    format(record.date, "yyyy-MM-dd'T'HH:mm")) ||
  "";

const handleSubmit = () => {
  if (!record.serviceIds.length) {
    dispatch(SET_ERROR_MESSAGE, "Выберите услуги");
    return;
  }

  if (!record.clientId) {
    dispatch(SET_ERROR_MESSAGE, "Выберите клиента");
    return;
  }

  dispatchEvent("submit", { record });
};

const handleInputDate = ({ target }) => {
  record.date = target.value;
};

const handleSelectClient = ({ detail }) => {
  record.clientId = detail.clientId;
};

const handleSelectServices = ({ detail }) => {
  record.serviceIds = detail.serviceIds;
};
</script>

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <Input
      on:input="{handleInputDate}"
      required="{true}"
      value="{recordDate}"
      placeholder="Выберите дату"
      type="datetime-local"
      label="Дата записи"
      name="date" />
  </FormItem>

  <FormItem>
    <ClientSelecter selectedClient="{recordClient}" on:input="{handleSelectClient}" />
  </FormItem>

  <FormItem>
    <ServicesSelecter
      selectedServices="{recordServices}"
      on:input="{handleSelectServices}" />
  </FormItem>

  <FormItem>
    <Button fullWidth="{true}">{buttonText}</Button>
  </FormItem>
</form>
