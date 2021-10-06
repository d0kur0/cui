<style src="./FabButton.css"></style>

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
