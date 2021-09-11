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

.summ-of-records {
  padding: 5px;
  text-align: center;
  font-size: 0.9em;
  background: #d9eaff;
  color: #6191c1;
  border-radius: 5px;
  margin-bottom: 5px;
}

.margin-container {
  margin: 0 10px;
}
</style>

<script>
import DateSelecter from "../components/DateSelecter.svelte";
import List from "../components/List.svelte";
import Title from "../components/Title.svelte";
import EmptyMessage from "../components/EmptyMessage.svelte";
import Avatar from "../components/Avatar.svelte";
import { format } from "date-fns";
import { useStoreon } from "@storeon/svelte";
import { link } from "svelte-spa-router";

const { records, clients, services } = useStoreon("records", "clients", "services");

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
  <div class="margin-container">
    <div class="summ-of-records">
      Потенциальный доход -
      {recordForList.reduce((acc, record) => acc + record.summPriceOfServices, 0)}₽
    </div>

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
                  {format(item.date, "HH:mm")}
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
  </div>
{:else}
  <EmptyMessage />
{/if}
