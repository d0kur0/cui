<script>
import { push } from "svelte-spa-router";
import { useStoreon } from "@storeon/svelte";
import { CLIENTS_CREATE } from "../../stores/clients";
import Form from "../../components/client/Form.svelte";
import Title from "../../components/Title.svelte";

const { dispatch } = useStoreon();

const handleSubmit = ({ detail }) => {
  dispatch(CLIENTS_CREATE, detail.client);
  push("/clients");
};
</script>

<Title title="Создание клиента" />
<Form on:submit="{handleSubmit}" />
