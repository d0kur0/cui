<style>
.picker__toolbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dashed rgb(230, 230, 230);
  padding: 8px 15px;
}

.picker__toolbar-button {
  border: none;
  font: inherit;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: var(--ancent-color);
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.picker__toolbar-button > svg) {
  width: 28px;
  height: 28px;
}

.picker__toolbar-button:hover {
  color: var(--ancent-color-dark);
}

.picker__toolbar-arrows {
  display: flex;
  align-items: center;
  margin: 0 -5px;
}

.picker__toolbar-arrows > button {
  margin: 0 5px;
}

.picker__days {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
}

.picker__days-name {
  font-size: 0.8em;
}

.picker__days-number {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  cursor: pointer;
  border: none;
  transition: 0.3s;
  font-size: 0.9em;
  background-color: rgb(241, 241, 241);
}

.picker__days-number:hover {
  background-color: rgb(226, 226, 226);
}

.picker__days-number--active {
  background-color: var(--ancent-color);
  color: #fff;
}

.picker__days-number--active:hover {
  background-color: var(--ancent-color-dark);
}

.picker__days-counter {
  font-size: 0.6em;
  width: 8px;
  height: 8px;
  background-color: var(--ancent-color-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.picker__days-day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.picker__date {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: rgb(241, 241, 241);
  font-size: 0.9em;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import { ChevronLeft32, ChevronRight32 } from "carbon-icons-svelte";
import { getDate, isEqual } from "date-fns";
import { getWeekDays } from "../helpers/getWeekDays";

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const { recordsDate } = useStoreon("recordsDate");
const weekDays = getWeekDays($recordsDate);
</script>

<div class="picker">
  <div class="picker__toolbar">
    <button class="picker__toolbar-button">Июль 2020</button>
    <div class="picker__toolbar-arrows">
      <button class="picker__toolbar-button"><ChevronLeft32 /></button>
      <button class="picker__toolbar-button">Сегодня</button>
      <button class="picker__toolbar-button"><ChevronRight32 /></button>
    </div>
  </div>
  <div class="picker__days">
    {#each weekDays as day, index}
      <div class="picker__days-day">
        <div class="picker__days-name">{dayNames[index]}</div>
        <button
          class="picker__days-number"
          class:picker__days-number--active="{isEqual($recordsDate, day)}"
          >{getDate(day)}</button>
        <div class="picker__days-counter"></div>
      </div>
    {/each}
  </div>
  <div class="picker__date">5 Июнь 2020</div>
</div>
