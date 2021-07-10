<style>
.tabbar {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: calc(100%);
  background-color: #ffafcc;
  border-radius: 15px 15px 0 0;
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
  color: rgb(39, 39, 39);
  transition: 0.5s;
  width: 100%;
  height: 100%;
  font-weight: 600;
}

.tabbar__link:hover,
.tabbar__link:focus {
  color: #a35471;
  text-decoration: none;
  background-color: inherit;
}

:global(.tabbar__item > a.active) {
  color: #c5557e;
}

:global(.tabbar__link > svg) {
  width: 25px;
}
</style>

<script>
import IoIosListBox from "svelte-icons/io/IoIosListBox.svelte";
import TiUser from "svelte-icons/ti/TiUser.svelte";
import TiGroup from "svelte-icons/ti/TiGroup.svelte";
import TiCalendar from "svelte-icons/ti/TiCalendar.svelte";
import TiChartArea from "svelte-icons/ti/TiChartArea.svelte";
import active from "svelte-spa-router/active";
import { link } from "svelte-spa-router";
</script>

<ul class="tabbar">
  <li class="tabbar__item">
    <a use:link use:active href="/" class="tabbar__link">
      <TiCalendar />
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/clients" class="tabbar__link">
      <TiGroup />
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/services" class="tabbar__link">
      <IoIosListBox />
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/statistic" class="tabbar__link">
      <TiChartArea />
    </a>
  </li>

  <li class="tabbar__item">
    <a use:link use:active href="/account" class="tabbar__link">
      <TiUser />
    </a>
  </li>
</ul>
