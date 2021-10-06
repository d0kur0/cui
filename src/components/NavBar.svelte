<style src="./NavBar.css"></style>

<script>
import IoIosArrowBack from "svelte-icons/io/IoIosArrowBack.svelte";
import TiPlus from "svelte-icons/ti/TiPlus.svelte";
import { link, pop } from "svelte-spa-router";
import { location } from "svelte-spa-router";

const allowedLocations = ["/clients", "/services", "/records"];
</script>

<div class="navbar">
	<button on:click="{() => pop()}" class="navbar__back-button">
		<IoIosArrowBack /> Назад
	</button>

	{#if allowedLocations.includes($location)}
		<a href="{`${$location}/create`}" use:link class="navbar__add-button">
			<TiPlus />Создать
		</a>
	{/if}
</div>
