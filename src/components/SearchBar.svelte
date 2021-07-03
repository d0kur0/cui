<style>
.searchbar {
  background-color: #fff;
  padding: 20px 15px;
}

.searchbar__fake-input {
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(241, 241, 241);
  box-shadow: 0 0 2px 1px #e0e0e0;
  border-radius: 5px;
  height: 35px;
}

.searchbar__fake-input:focus-within {
  box-shadow: 0 0 1px 1px #b9b9b9;
}

.searchbar__input {
  flex-grow: 1;
  font: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  color: rgb(121, 121, 121);
  padding: 0;
  height: 100%;
}

.searchbar__leading-icon {
  padding: 2px 10px;
}

.searchbar__clear-button {
  transition: 0.2s;
  opacity: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.searchbar__clear-button--active {
  padding: 2px 10px;
  opacity: 1;
  pointer-events: all;
}
</style>

<script>
import Search32 from "carbon-icons-svelte/lib/Search32";
import CloseFilled20 from "carbon-icons-svelte/lib/CloseFilled16";

let searchValue;
let searchInput;

const handleClearInput = () => {
  searchValue = "";

  if (searchInput) {
    searchInput.focus();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  }
};
</script>

<div class="searchbar">
  <div class="searchbar__fake-input">
    <div class="searchbar__leading-icon">
      <Search32 style="width: 26px; height: 26px;" />
    </div>

    <input
      on:input
      bind:this="{searchInput}"
      bind:value="{searchValue}"
      placeholder="Поиск"
      class="searchbar__input" />

    <div
      on:click="{handleClearInput}"
      class="searchbar__clear-button"
      class:searchbar__clear-button--active="{searchValue?.length}">
      <CloseFilled20 style="width: 20px; height: 20px" />
    </div>
  </div>
</div>
