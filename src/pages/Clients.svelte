<script>
import Avatar from "../components/Avatar.svelte";
import List from "../components/List.svelte";
import SearchBar from "../components/SearchBar.svelte";
import ChevronRight32 from "carbon-icons-svelte/lib/ChevronRight32";
import { link } from "svelte-spa-router";
import FabButton from "../components/FabButton.svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";
import { useStoreon } from "@storeon/svelte";

const { clients } = useStoreon("clients");
let searchQuery = "";
$: filteredClients = $clients.filter(
  ({ name, description }) =>
    name.toLowerCase().includes(searchQuery) ||
    description.toLowerCase().includes(searchQuery)
);

const handleSearchInput = event => {
  searchQuery = event.target.value;
};
</script>

<SearchBar on:input="{handleSearchInput}" />
<FabButton href="/clients/create" />
{#if filteredClients.length}
  <List items="{filteredClients}" let:item>
    <li>
      <a href="{`/clients/${item.id}`}" use:link class="list__event-button">
        Open client
      </a>

      <div class="list__item-avatar">
        <Avatar initials="{item.name}" />
      </div>
      <div class="list__item">
        <div class="list__item-content">
          <h2>{item.name}</h2>
          <h3>{item.description}</h3>
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
