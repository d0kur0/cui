<style>
.page-container {
  position: relative;
  background-color: #fff;
  --navbar-height: calc(80px + var(--safe-area-inset-top));
  --tabbar-height: calc(50px + var(--safe-area-inset-bottom));
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

@media (min-width: 1024px) {
  :global(body) {
    max-width: 100%;
  }

  .page-container {
    display: grid;
    grid-template-columns: 80px 1fr 1.3fr 1fr;
    grid-template-rows: 0.2fr 1.8fr;
    gap: 0px 0px;
    grid-template-areas:
      "tabbar navbar navbar navbar"
      "tabbar . content .";
  }

  .page-container__navbar {
    grid-area: navbar;
  }

  .page-container__tabbar {
    grid-area: tabbar;
  }

  .page-container__content {
    grid-area: content;
    position: relative;
  }
}
</style>

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
