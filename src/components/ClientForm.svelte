<script>
import Button from "../components/Button.svelte";
import FormItem from "../components/FormItem.svelte";
import Input from "../components/Input.svelte";
import { createEventDispatcher } from "svelte";

export let client = { name: "", description: "" };
export let buttonText = "Создать";

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch("submit", { client });
const handleInput = ({ target }) => (client[target.name] = target.value);
</script>

<form on:submit|preventDefault="{handleSubmit}">
  <FormItem>
    <Input
      on:input="{handleInput}"
      required="{true}"
      value="{client.name}"
      placeholder="Воняева Марина"
      type="text"
      label="Имя"
      name="name" />
  </FormItem>

  <FormItem>
    <Input
      on:input="{handleInput}"
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
