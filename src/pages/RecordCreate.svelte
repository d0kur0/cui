<script>
import { push } from "svelte-spa-router";
import { useStoreon } from "@storeon/svelte";
import Title from "../components/Title.svelte";
import RecordForm from "../components/RecordForm.svelte";
import { RECORDS_CREATE } from "../stores/records";

const { dispatch } = useStoreon();

const handleSubmit = ({ detail }) => {
  dispatch(RECORDS_CREATE, detail.service);
  push("/records");
};
</script>

<Title title="Создание записи" />
<RecordForm on:submit="{handleSubmit}" />
