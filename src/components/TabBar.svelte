<style>
.tabbar {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  border-top: 1px solid #ddd;
}

.tabbar__item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  transition: 0.4s;
}

.tabbar__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
  color: rgb(107, 107, 107);
  transition: 0.3s;
  width: 100%;
  height: 100%;
}

.tabbar__link:hover,
.tabbar__link:focus {
  color: var(--ancent-color);
  text-decoration: none;
  background-color: rgb(245, 245, 245);
}

:global(.tabbar__item > a.active) {
  color: var(--ancent-color);
}
</style>

<script>
import UserMultiple32 from "carbon-icons-svelte/lib/UserMultiple32";
import UserAvatar32 from "carbon-icons-svelte/lib/UserAvatar32";
import ShoppingCatalog32 from "carbon-icons-svelte/lib/ShoppingCatalog32";
import CalendarHeatMap32 from "carbon-icons-svelte/lib/CalendarHeatMap32";
import active from "svelte-spa-router/active";
import { link } from "svelte-spa-router";

const iconStyles = "width: 24px; height: 24px; padding-bottom: 3px;";
</script>

<ul class="tabbar">
  <li class="tabbar__item">
    <a use:link use:active href="/" class="tabbar__link">
      <CalendarHeatMap32 style="{iconStyles}" /> Записи
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/clients" class="tabbar__link">
      <UserMultiple32 style="{iconStyles}" /> Клиенты
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/services" class="tabbar__link">
      <ShoppingCatalog32 style="{iconStyles}" /> Услуги
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/account" class="tabbar__link">
      <UserAvatar32 style="{iconStyles}" /> Аккаунт
    </a>
  </li>
</ul>
