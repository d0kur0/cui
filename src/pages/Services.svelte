<script>
import List from "../components/List.svelte";
import PageContainer from "../components/PageContainer.svelte";
import SearchBar from "../components/SearchBar.svelte";
import ChevronRight32 from "carbon-icons-svelte/lib/ChevronRight32";
import { link } from "svelte-spa-router";
import FabButton from "../components/FabButton.svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";
import { useStoreon } from "@storeon/svelte";

const { services } = useStoreon("services");

let searchQuery = "";
$: filteredServices = $services.filter(
  ({ name, price }) =>
    name.toLowerCase().includes(searchQuery) || price.toString().includes(searchQuery)
);

const handleSearchInput = event => {
  searchQuery = event.target.value;
};
</script>

<PageContainer title="Услуги">
  <SearchBar on:change="{handleSearchInput}" on:input="{handleSearchInput}" />
  <FabButton href="/services/create" />
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
</PageContainer>
