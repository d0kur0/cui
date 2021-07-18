<style>
.picker {
  user-select: none;
  background-color: #fff7ff;
  border-radius: 10px;
  margin: 10px;
}

.picker__toolbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dashed #b5b5b5;
  padding: 8px 15px;
}

.picker__toolbar-button {
  border: none;
  font: inherit;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #000;
  font: inherit;
  font-weight: 500;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.picker__toolbar-button > svg) {
  width: 24px;
}

.picker__toolbar-button:hover {
  color: rgb(71, 71, 71);
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
  padding-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.picker__days-number {
  font: inherit;
  font-weight: 600;
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
  background-color: #e5f0ff;
  position: relative;
}

.picker__days-number:hover {
  background-color: rgb(226, 226, 226);
}

.picker__days-number:disabled {
  background-color: transparent;
}

.picker__days-number:disabled > .picker__days-counter {
  display: none;
}

.picker__days-number--active {
  background-color: #61b0ff;
  color: #fff;
}

.picker__days-number--active:hover {
  background-color: #61b0ff;
}

.picker__days-counter {
  font-size: 0.7em;
  width: 15px;
  height: 15px;
  background-color: #ff6a6a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  top: -2px;
  right: -2px;
  font-weight: normal;
}

.picker__days-day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-basis: calc(100% / 7);
}

.picker__date {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: 1em;
  text-transform: capitalize;
  color: #000;
  font-weight: 500;
  border-top: 1px solid #000;
  margin: 0 15px;
}

.picker__day-names {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  padding-top: 10px;
}

.picker__day-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
  font-weight: 600;
  flex-basis: calc(100% / 7);
  color: #000;
}
</style>

<script>
import { RECORDS_SET_DATE } from "./../stores/records.js";
import { useStoreon } from "@storeon/svelte";
import { ChevronLeft32, ChevronRight32 } from "carbon-icons-svelte";
import { addMonths, format, getDate, isEqual, startOfMonth, subMonths } from "date-fns";
import { getWeekDays } from "../helpers/getWeekDays";
import IoMdCalendar from "svelte-icons/io/IoMdCalendar.svelte";
import ruLocale from "date-fns/locale/ru";

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const { recordsDate, monthDaysCount, dispatch } = useStoreon(
  "recordsDate",
  "monthDaysCount"
);
$: weekDays = getWeekDays($recordsDate).map(day => {
  const dayOfMonth = getDate(day.date);
  const counter = $monthDaysCount?.[dayOfMonth] || 0;
  return { ...day, counter };
});

const handlePlusMonth = () => {
  dispatch(RECORDS_SET_DATE, startOfMonth(addMonths($recordsDate, 1)));
};

const handleMinusMonth = () => {
  dispatch(RECORDS_SET_DATE, startOfMonth(subMonths($recordsDate, 1)));
};

const handleSelectToday = () => {
  dispatch(RECORDS_SET_DATE, new Date());
};

const handleSelectDay = dayAsDate => {
  dispatch(RECORDS_SET_DATE, dayAsDate);
};
</script>

<div class="picker">
  <div class="picker__toolbar">
    <button class="picker__toolbar-button">
      <IoMdCalendar />
    </button>
    <div class="picker__toolbar-arrows">
      <button class="picker__toolbar-button" on:click="{handleMinusMonth}">
        <ChevronLeft32 />
      </button>
      <button class="picker__toolbar-button" on:click="{handleSelectToday}">
        Сегодня
      </button>
      <button class="picker__toolbar-button" on:click="{handlePlusMonth}">
        <ChevronRight32 />
      </button>
    </div>
  </div>
  <div class="picker__day-names">
    {#each dayNames as dayName}
      <div class="picker__day-name">{dayName}</div>
    {/each}
  </div>
  <div class="picker__days">
    {#each weekDays as { date, isActive, counter }}
      <div class="picker__days-day">
        <button
          on:click="{() => handleSelectDay(date)}"
          class="picker__days-number"
          class:picker__days-number--active="{isEqual(
            $recordsDate.setHours(0, 0, 0, 0),
            date.setHours(0, 0, 0, 0)
          )}"
          disabled="{!isActive}">
          {#if counter}
            <div class="picker__days-counter">{counter}</div>
          {/if}
          {getDate(date)}
        </button>
      </div>
    {/each}
  </div>
  <div class="picker__date">
    {format($recordsDate, "d LLLL yyyy", { locale: ruLocale })}
  </div>
</div>
