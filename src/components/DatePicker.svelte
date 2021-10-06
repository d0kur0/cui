<style src="./DatePicker.css"></style>

<script>
import { addMonths, format, getDate, isEqual, startOfMonth, subMonths } from "date-fns";
import { getWeekDays } from "../helpers/getWeekDays";

import { RECORDS_SET_DATE } from "./../stores/records.js";
import { useStoreon } from "@storeon/svelte";
import { STATISTIC_SET_MONTH_DAYS_COUNT } from "../stores/statistic.js";

import ruLocale from "date-fns/locale/ru";
import IoMdCalendar from "svelte-icons/io/IoMdCalendar.svelte";
import IoIosArrowBack from "svelte-icons/io/IoIosArrowBack.svelte";
import IoIosArrowForward from "svelte-icons/io/IoIosArrowForward.svelte";

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

function handlePlusMonth() {
	dispatch(STATISTIC_SET_MONTH_DAYS_COUNT, {});
	dispatch(RECORDS_SET_DATE, startOfMonth(addMonths($recordsDate, 1)));
}

function handleMinusMonth() {
	dispatch(STATISTIC_SET_MONTH_DAYS_COUNT, {});
	dispatch(RECORDS_SET_DATE, startOfMonth(subMonths($recordsDate, 1)));
}

function handleSelectToday() {
	dispatch(RECORDS_SET_DATE, new Date());
}

function handleSelectDay(dayAsDate) {
	dispatch(RECORDS_SET_DATE, dayAsDate);
}
</script>

<div class="picker">
	<div class="picker__toolbar">
		<button class="picker__toolbar-button">
			<IoMdCalendar />
		</button>
		<div class="picker__toolbar-arrows">
			<button class="picker__toolbar-button" on:click="{handleMinusMonth}">
				<IoIosArrowBack />
			</button>
			<button class="picker__toolbar-button" on:click="{handleSelectToday}">
				Сегодня
			</button>
			<button class="picker__toolbar-button" on:click="{handlePlusMonth}">
				<IoIosArrowForward />
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
