<style src="./ImportantMessage.css"></style>

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
