<script>
import { push } from "svelte-spa-router";
import { useStoreon } from "@storeon/svelte";
import { SERVICES_CREATE } from "../../stores/services";
import ServiceForm from "../../components/service/Form.svelte";
import Title from "../../components/Title.svelte";

const { dispatch } = useStoreon();

const handleSubmit = ({ detail }) => {
  dispatch(SERVICES_CREATE, detail.service);
  push("/services");
};
</script>

<Title title="Создание услуги" />
<ServiceForm on:submit="{handleSubmit}" />
