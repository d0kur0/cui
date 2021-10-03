<script>
import Button from "../Button.svelte";
import FormItem from "../FormItem.svelte";
import Input from "../Input.svelte";
import { createEventDispatcher } from "svelte";

export let client = { name: "", description: "" };
export let buttonText = "Создать";

const dispatch = createEventDispatcher();

function handleSubmit() {
  dispatch("submit", { client });
}

function handleInput({ target }) {
  client[target.name] = target.value;
}
</script>

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <Input
      on:change="{handleInput}"
      required="{true}"
      value="{client.name}"
      placeholder="Воняева Марина"
      type="text"
      label="Имя"
      name="name" />
  </FormItem>

  <FormItem>
    <Input
      on:change="{handleInput}"
      value="{client.description}"
      placeholder="Воняет тухлым сыром"
      type="text"
      label="Описание"
      name="description" />
  </FormItem>

  <FormItem>
    <Button fullWidth="{true}">{buttonText}</Button>
  </FormItem>
</form>
