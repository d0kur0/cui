<style src="./PageContainer.css"></style>

<script>
import { useStoreon } from "@storeon/svelte";
import { fade } from "svelte/transition";
import NavBar from "./NavBar.svelte";
import Notifications from "./Notifications.svelte";
import Spinner from "./Spinner.svelte";
import TabBar from "./TabBar.svelte";

export let hideTabBar = false;

const { isPending } = useStoreon("isPending");
</script>

{#if $isPending}
	<div class="pending" transition:fade="{{ duration: 500 }}">
		<Spinner />
	</div>
{/if}

<main class="page-container" class:page-container--with-out-tabbar="{hideTabBar}">
	<div class="page-container__navbar">
		<NavBar />
	</div>

	<div class="page-container__content"><slot /></div>

	{#if !hideTabBar}
		<div class="page-container__tabbar">
			<TabBar />
		</div>
	{/if}

	<Notifications />
</main>
