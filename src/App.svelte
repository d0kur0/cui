<style src="./App.css" global></style>

<script>
import calculateHeightUnit from "./helpers/calculateHeightUnit";
import { provideStoreon } from "@storeon/svelte";
import { store } from "./stores";
import Routes from "./Routes.svelte";
provideStoreon(store);
</script>

<svelte:window on:resize="{calculateHeightUnit}" on:load="{calculateHeightUnit}" />
<Routes />
