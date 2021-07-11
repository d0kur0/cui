<script>
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import Input from "../components/Input.svelte";
import { createEventDispatcher } from "svelte";

export let record = { clientId: "", serviceIds: [], date: "" };
export let buttonText = "Создать";

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch("submit", { record });
const handleInput = ({ target }) => (record[target.name] = target.value);
</script>

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <Input
      on:input="{handleInput}"
      required="{true}"
      value="{record.date}"
      placeholder="Выберите дату"
      type="datetime-local"
      label="Дата записи"
      name="date" />
  </FormItem>

  <FormItem>
    <Input
      on:input="{handleInput}"
      required="{true}"
      value="{record.clientId}"
      placeholder="1000"
      type="number"
      label="Стоимость"
      name="price" />
  </FormItem>

  <FormItem>
    <Button fullWidth="{true}">{buttonText}</Button>
  </FormItem>
</form>
