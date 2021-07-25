<style>
.fab-button {
  position: fixed;
  bottom: calc(var(--tabbar-height) + 20px);
  right: 20px;
  background-color: var(--ancent-color);
  font: inherit;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  color: #fff;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}

.fab-button:hover {
  opacity: 0.9;
}
</style>

<script>
import TiPlus from "svelte-icons/ti/TiPlus.svelte";
import { link } from "svelte-spa-router";

export let href;
</script>

{#if href}
  <a on:click href="{href}" use:link class="fab-button">
    <TiPlus />
  </a>
{:else}
  <button on:click class="fab-button">
    <TiPlus />
  </button>
{/if}
