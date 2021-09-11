<style>
.user {
  padding: 10px 20px;
  display: flex;
}

.user__name {
  font-weight: bolder;
}

.user__info {
  margin-left: 15px;
}

.user__exit-button {
  border: none;
  color: var(--ancent-color);
  padding: 0;
  margin: 0;
  background-color: transparent;
  cursor: pointer;
}

.statistic {
  list-style: none;
  margin: 0;
  padding: 0;
  padding: 0 15px;
}

.statistic__item {
  color: #868686;
  font-weight: 500;
  font-size: 1.2em;
  display: flex;
  padding: 7px 0;
  border-bottom: 5px dashed #dadada;
  margin-top: 15px;
}

.statistic__item:first-child {
  margin-top: 0;
}

.statistic__item-counter {
  margin-left: auto;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import { USER_SIGN_OUT } from "../stores/user";
import Avatar from "../components/Avatar.svelte";
import Title from "../components/Title.svelte";
import { push } from "svelte-spa-router";

const { user, clients, services, dispatch } = useStoreon("user", "clients", "services");

console.log($clients);

const handleExit = () => {
  dispatch(USER_SIGN_OUT);
  push("/signIn");
};

$: counters = [
  {
    title: "Клиентов",
    amount: $clients.length,
  },
  {
    title: "Услуг",
    amount: $services.length,
  },
];
</script>

<Title title="Аккаунт" />

<div class="user">
  <div class="user__avatar"><Avatar src="{$user.picture}" /></div>
  <div class="user__info">
    <div class="user__name">{$user.name}</div>
    <div class="user__exit">
      <button on:click="{handleExit}" class="user__exit-button">Выйти</button>
    </div>
  </div>
</div>

<Title title="Статистика" />

<ul class="statistic">
  {#each counters as { title, amount }}
    <li class="statistic__item">
      {title}
      <div class="statistic__item-counter">{amount}</div>
    </li>
  {/each}
</ul>
