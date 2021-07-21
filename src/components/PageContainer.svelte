<style>
.page-container {
  position: relative;
  background-color: #fff;
  --navbar-height: 80px;
  --tabbar-height: 50px;
}

.page-container--with-out-tabbar {
  --tabbar-height: 0px;
}

.page-container__navbar {
  height: var(--navbar-height);
}

.page-container__content {
  height: calc((var(--vh, 1vh) * 100) - (var(--tabbar-height) + var(--navbar-height)));
  background-color: #fff;
  color: rgba(0, 0, 0, 0.54);
  overflow-y: auto;
}

.page-container__tabbar {
  height: var(--tabbar-height);
}

.pending {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffffbd;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import { fade } from "svelte/transition";
import NavBar from "./NavBar.svelte";
import Notifications from "./Notifications.svelte";
import Spinner from "./Spinner.svelte";
import TabBar from "./TabBar.svelte";

export let title;
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
    <NavBar title="{title}" />
  </div>

  <div class="page-container__content"><slot /></div>

  {#if !hideTabBar}
    <div class="page-container__tabbar">
      <TabBar />
    </div>
  {/if}

  <Notifications />
</main>
