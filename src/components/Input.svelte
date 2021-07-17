<style>
.input {
  display: flex;
  flex-direction: column;
}

.input__label {
  padding-bottom: 5px;
  font-size: 0.9em;
  color: rgb(65, 65, 65);
}

.input__input {
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  padding: 12px 0;
  margin: 0;
  font: inherit;
  font-size: 1.1em;
  outline: none;
  width: 100%;
}

.input__input::placeholder {
  color: rgb(146, 146, 146);
}
</style>

<script>
export let label;
export let type;
export let required = false;
export let name;
export let placeholder;
export let value = "";
</script>

<div class="input">
  {#if label}
    <label class="input__label" for="{name}">{label}</label>
  {/if}

  <input
    on:blur
    on:input
    class="input__input"
    placeholder="{placeholder}"
    required="{required}"
    type="{type}"
    id="{name}"
    value="{value}"
    name="{name}" />
</div>
