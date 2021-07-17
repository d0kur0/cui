<style>
.navbar {
  height: calc(100% - 3px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 500;
  padding: 8px 15px;
  padding-top: 20px;
  font-weight: 500;
}

.navbar__back-button {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: #000;
  transition: 0.3s;
}

.navbar__back-button:hover {
  color: rgb(66, 66, 66);
}

:global(.navbar__back-button > svg) {
  width: 25px;
}

.navbar__add-button {
  border: none;
  transition: 0.3s;
  margin: 0;
  padding: 10px 20px;
  font: inherit;
  background-color: #ccdff7;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  line-height: 0;
}

.navbar__add-button:hover {
  background-color: #bdd1eb;
}

:global(.navbar__add-button > svg) {
  width: 22px;
  padding-right: 5px;
}
</style>

<script>
import IoIosArrowBack from "svelte-icons/io/IoIosArrowBack.svelte";
import TiPlus from "svelte-icons/ti/TiPlus.svelte";
import { link, pop } from "svelte-spa-router";
import { location } from "svelte-spa-router";

const allowedLocations = ["/clients", "/services", "/records"];
</script>

<div class="navbar">
  <button on:click="{() => pop()}" class="navbar__back-button">
    <IoIosArrowBack />
  </button>

  {#if allowedLocations.includes($location)}
    <a href="{`${$location}/create`}" use:link class="navbar__add-button">
      <TiPlus />Создать
    </a>
  {/if}
</div>
