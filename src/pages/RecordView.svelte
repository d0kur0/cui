<script>
import { useStoreon } from "@storeon/svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import { push } from "svelte-spa-router";
import { RECORDS_DELETE, RECORDS_UPDATE } from "../stores/records";
import RecordForm from "../components/RecordForm.svelte";
import Title from "../components/Title.svelte";

export let params = {};

const { records, dispatch } = useStoreon("records");
$: record = $records.find(record => record.id === params?.id);

const handleSubmit = ({ detail }) => {
  console.log("handleSubmit", detail);
  dispatch(RECORDS_UPDATE, detail.record);
  push("/records");
};

const handleDelete = () => {
  if (!confirm("Подтвердите удаление, действие нельзя отменить")) return;
  dispatch(RECORDS_DELETE, record.id);
  push("/records");
};
</script>

<Title title="Ред. записи" />
{#if record}
  <RecordForm on:submit="{handleSubmit}" buttonText="Изменить" record="{record}" />
  <FormItem>
    <Button
      on:click="{handleDelete}"
      onlyBorder="{true}"
      danger="{true}"
      fullWidth="{true}">Удалить</Button>
  </FormItem>
{:else}
  <EmptyMessage message="Запись не найдена" />
{/if}
