<script>
import List from "../components/List.svelte";
import SearchBar from "../components/SearchBar.svelte";
import ChevronRight32 from "carbon-icons-svelte/lib/ChevronRight32";
import { link } from "svelte-spa-router";
import EmptyMessage from "../components/EmptyMessage.svelte";
import { useStoreon } from "@storeon/svelte";
import Title from "../components/Title.svelte";

const { services } = useStoreon("services");

let searchQuery = "";
$: filteredServices = $services.filter(
  ({ name, price }) =>
    name.toLowerCase().includes(searchQuery) || price.toString().includes(searchQuery)
);

const handleSearchInput = ({ detail }) => {
  searchQuery = detail.value;
};
</script>

<Title title="Мои услуги" />
<SearchBar on:input="{handleSearchInput}" on:change="{handleSearchInput}" />
{#if filteredServices.length}
  <List items="{filteredServices}" let:item>
    <li>
      <a href="{`/services/${item.id}`}" use:link class="list__event-button">
        Open service
      </a>

      <div class="list__item">
        <div class="list__item-content">
          <h2>{item.name}</h2>
          <h3>{item.price} рублей</h3>
        </div>
        <div class="list__item-end">
          <ChevronRight32 />
        </div>
      </div>
    </li>
  </List>
{:else}
  <EmptyMessage />
{/if}
