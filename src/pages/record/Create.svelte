<script>
import { push } from "svelte-spa-router";
import { useStoreon } from "@storeon/svelte";
import { RECORDS_CREATE } from "../../stores/records";

import Title from "../../components/Title.svelte";
import RecordForm from "../../components/record/Form.svelte";

const { dispatch } = useStoreon();

function handleSubmit({ detail }) {
  dispatch(RECORDS_CREATE, detail.record);
  push("/records");
}
</script>

<Title title="Создание записи" />
<RecordForm on:submit="{handleSubmit}" />
