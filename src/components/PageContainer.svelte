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
</style>

<script>
import NavBar from "./NavBar.svelte";
import Notifications from "./Notifications.svelte";
import TabBar from "./TabBar.svelte";

export let title;
export let hideTabBar = false;
</script>

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
