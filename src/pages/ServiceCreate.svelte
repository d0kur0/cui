<script>
import PageContainer from "../components/PageContainer.svelte";
import { push } from "svelte-spa-router";
import { useStoreon } from "@storeon/svelte";
import { SERVICES_CREATE } from "../stores/services";
import ServiceForm from "../components/ServiceForm.svelte";

const { dispatch } = useStoreon();

const handleSubmit = ({ detail }) => {
  dispatch(SERVICES_CREATE, detail.service);
  push("/services");
};
</script>

<ServiceForm on:submit="{handleSubmit}" />
