<style>
.important-message {
  margin: 10px 15px;
  border-radius: 5px;
  color: #ad5000;
  background-color: #ffc8aa;
  padding: 10px 15px;
}

:global(.important-message > svg) {
  width: 24px;
  vertical-align: sub;
}

.important-message--info {
  color: #065bb1;
  background-color: #b9d8ff;
}
</style>

<script>
import IoIosWarning from "svelte-icons/io/IoIosWarning.svelte";
import IoIosInformationCircle from "svelte-icons/io/IoIosInformationCircle.svelte";
export let style = "warning";
</script>

<div class="important-message" class:important-message--info="{style === 'info'}">
  {#if style === "warning"}
    <IoIosWarning />
  {/if}

  {#if style === "info"}
    <IoIosInformationCircle />
  {/if}

  <slot />
</div>
