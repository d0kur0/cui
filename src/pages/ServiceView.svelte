<script>
import { useStoreon } from "@storeon/svelte";
import PageContainer from "../components/PageContainer.svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";
import { SERVICES_DELETE, SERVICES_UPDATE } from "../stores/services";
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import ServiceForm from "../components/ServiceForm.svelte";
import { push } from "svelte-spa-router";

export let params = {};

const { services, dispatch } = useStoreon("services");
$: service = $services.find(service => service.id === params?.id);

const handleSubmit = ({ detail }) => {
  dispatch(SERVICES_UPDATE, detail.service);
  push("/services");
};

const handleDelete = () => {
  if (!confirm("Подтвердите удаление, действие нельзя отменить")) return;
  dispatch(SERVICES_DELETE, service.id);
  push("/services");
};
</script>

<PageContainer title="Редактирование усуги">
  {#if service}
    <ServiceForm on:submit="{handleSubmit}" buttonText="Изменить" service="{service}" />
    <FormItem>
      <Button
        on:click="{handleDelete}"
        onlyBorder="{true}"
        danger="{true}"
        fullWidth="{true}">Удалить</Button>
    </FormItem>
  {:else}
    <EmptyMessage message="Услуга не найдена" />
  {/if}
</PageContainer>
