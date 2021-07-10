<script>
import { useStoreon } from "@storeon/svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";
import ClientForm from "../components/ClientForm.svelte";
import { CLIENTS_DELETE, CLIENTS_UPDATE } from "../stores/clients";
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import { push } from "svelte-spa-router";

export let params = {};

const { clients, dispatch } = useStoreon("clients");
$: client = $clients.find(client => client.id === params?.id);

const handleSubmit = ({ detail }) => {
  dispatch(CLIENTS_UPDATE, detail.client);
  push("/clients");
};

const handleDelete = () => {
  if (!confirm("Подтвердите удаление, действие нельзя отменить")) return;
  dispatch(CLIENTS_DELETE, client.id);
  push("/clients");
};
</script>

{#if client}
  <ClientForm on:submit="{handleSubmit}" buttonText="Изменить" client="{client}" />
  <FormItem>
    <Button
      on:click="{handleDelete}"
      onlyBorder="{true}"
      danger="{true}"
      fullWidth="{true}">Удалить</Button>
  </FormItem>
{:else}
  <EmptyMessage message="Клиент не найден" />
{/if}
