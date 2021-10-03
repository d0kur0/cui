<script>
import { createEventDispatcher } from "svelte";

import Input from "../Input.svelte";
import Button from "../Button.svelte";
import FormItem from "../FormItem.svelte";

export let service = { name: "", price: 0 };
export let buttonText = "Создать";

const dispatch = createEventDispatcher();

function handleSubmit() {
  dispatch("submit", { service });
}

function handleInput({ target }) {
  service[target.name] = target.value;
}
</script>

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <Input
      on:change="{handleInput}"
      required="{true}"
      value="{service.name}"
      placeholder="Опил жопы"
      type="text"
      label="Название"
      name="name" />
  </FormItem>

  <FormItem>
    <Input
      on:change="{handleInput}"
      required="{true}"
      value="{service.price}"
      placeholder="1000"
      type="number"
      label="Стоимость"
      name="price" />
  </FormItem>

  <FormItem>
    <Button fullWidth="{true}">{buttonText}</Button>
  </FormItem>
</form>
