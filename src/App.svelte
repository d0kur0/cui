<style src="./App.css" global></style>

<script>
import calculateHeightUnit from "./helpers/calculateHeightUnit";
import { provideStoreon } from "@storeon/svelte";
import UpdatePrompt from "./components/UpdatePrompt.svelte";
import InstallPrompt from "./components/InstallPrompt.svelte";
import { store } from "./stores";
import Routes from "./Routes.svelte";

provideStoreon(store);

export let workbox;
</script>

<svelte:window on:resize="{calculateHeightUnit}" on:load="{calculateHeightUnit}" />
<UpdatePrompt workbox="{workbox}" />
<InstallPrompt />
<Routes />
