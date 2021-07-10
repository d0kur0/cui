<script>
import { push } from "svelte-spa-router";
import { useStoreon } from "@storeon/svelte";
import { CLIENTS_CREATE } from "../stores/clients";
import ClientForm from "../components/ClientForm.svelte";

const { dispatch } = useStoreon();

const handleSubmit = ({ detail }) => {
  dispatch(CLIENTS_CREATE, detail.client);
  push("/clients");
};
</script>

<ClientForm on:submit="{handleSubmit}" />
