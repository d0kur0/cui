<style>
.list__item-content {
  width: 100%;
}

.services {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.services__service {
  background: #ffe8ff;
  color: #0a0a0a;
  border-radius: 5px;
  padding: 3px 10px;
  font-size: 0.9em;
  font-weight: initial;
}

.client {
  display: flex;
}

.client__avatar {
  margin-right: 8px;
}

.client__info-time {
  color: rgb(49, 49, 49);
  font-weight: normal;
  font-size: 0.8em;
}

.client__price {
  flex-grow: 1;
  text-align: right;
}

.description {
  margin-top: 8px;
  font-size: 0.9em;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";

import DateSelecter from "../components/DateSelecter.svelte";
import List from "../components/List.svelte";
import Title from "../components/Title.svelte";
import { link } from "svelte-spa-router";
import EmptyMessage from "../components/EmptyMessage.svelte";
import { format } from "date-fns";
import Avatar from "../components/Avatar.svelte";

const { records, clients, services } = useStoreon(
  "records",
  "recordsDate",
  "clients",
  "services"
);

$: recordForList = $records.map(record => {
  const servicesList = $services.filter(({ id }) => record.serviceIds.includes(id));

  return {
    ...record,
    client: $clients.find(({ id }) => id === record.clientId),
    services: servicesList.map(({ name }) => name),
    summPriceOfServices: servicesList.reduce((acc, { price }) => acc + +price, 0),
  };
});
</script>

<Title title="Мои записи" />
<DateSelecter />
{#if recordForList.length}
  <List items="{recordForList}" let:item>
    <li>
      <a href="{`/records/${item.id}`}" use:link class="list__event-button">
        Open record
      </a>

      <div class="list__item">
        <div class="list__item-content">
          <div class="client">
            <div class="client__avatar">
              <Avatar initials="{item.client?.name || 'Deleted Client'}" />
            </div>
            <div class="client__info">
              <div class="client__info-name">
                {item.client?.name || "Deleted Client"}
              </div>
              <div class="client__info-time">
                {format(item.date, "hh:mm")}
              </div>
            </div>
            <div class="client__price">
              {item.summPriceOfServices}₽
            </div>
          </div>
          <div class="services">
            {#each item.services as service}
              <div class="services__service">{service}</div>
            {/each}
          </div>
          {#if item.description}
            <div class="description">Примечание: {item.description}</div>
          {/if}
        </div>
      </div>
    </li>
  </List>
{:else}
  <EmptyMessage />
{/if}
