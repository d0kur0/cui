<script>
import Avatar from "../components/Avatar.svelte";
import List from "../components/List.svelte";
import SearchBar from "../components/SearchBar.svelte";
import IoIosArrowForward from "svelte-icons/io/IoIosArrowForward.svelte";
import { link } from "svelte-spa-router";
import EmptyMessage from "../components/EmptyMessage.svelte";
import { useStoreon } from "@storeon/svelte";
import Title from "../components/Title.svelte";

const { clients } = useStoreon("clients");

let searchQuery = "";
$: filteredClients = $clients.filter(
  ({ name, description }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    description.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleSearchInput = ({ detail }) => {
  searchQuery = detail.value;
};
</script>

<Title title="Мои клиенты" />
<SearchBar on:input="{handleSearchInput}" />
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
          <IoIosArrowForward />
        </div>
      </div>
    </li>
  </List>
{:else}
  <EmptyMessage />
{/if}
