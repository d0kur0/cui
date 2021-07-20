<script>
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import Input from "../components/Input.svelte";
import { createEventDispatcher } from "svelte";

export let service = { name: "", price: 0 };
export let buttonText = "Создать";

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch("submit", { service });
const handleInput = ({ target }) => (service[target.name] = target.value);
</script>

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <Input
      on:input="{handleInput}"
      required="{true}"
      value="{service.name}"
      placeholder="Опил жопы"
      type="text"
      label="Название"
      name="name" />
  </FormItem>

  <FormItem>
    <Input
      on:input="{handleInput}"
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
