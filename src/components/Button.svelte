<style>
.button {
  font: inherit;
  background-color: #80b8ff;
  border: 1px solid var(--ancent-color);
  color: #fff;
  border: none;
  padding: 10px 15px;
  transition: 0.3s;
  cursor: pointer;
}

.button:hover,
.button:active {
  background-color: #78acf0;
}

.button--fullwidth {
  width: 100%;
}

.button--rounded {
  border-radius: 5px;
}

.button--danger {
  color: #fff;
  border: 1px solid rgb(255, 126, 126);
  background-color: rgb(255, 103, 103);
}

.button--danger.button--only-border {
  color: rgb(255, 103, 103);
}

.button--danger:hover {
  border: 1px solid rgb(243, 103, 103);
  background-color: rgb(245, 81, 81);
}

.button--only-border,
.button--only-border:hover,
.button--only-border:focus {
  background-color: transparent;
}
</style>

<script>
export let fullWidth = false;
export let rounded = true;
export let small = false;
export let large = false;
export let danger = false;
export let onlyBorder = false;
</script>

<button
  type="submit"
  class:button--fullwidth="{fullWidth}"
  class:button--rounded="{rounded}"
  class:button--large="{large}"
  class:button--small="{small}"
  class:button--danger="{danger}"
  class:button--only-border="{onlyBorder}"
  class="button"
  on:click>
  <slot />
</button>
