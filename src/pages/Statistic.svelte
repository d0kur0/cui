<style>
.date {
	margin-top: 15px;
	color: rgb(73, 73, 73);
	padding: 8px 15px;
	align-items: center;
	display: flex;
	justify-content: space-between;
}

.date__slide-button {
	width: 28px;
	border: none;
	background-color: transparent;
	padding: 0;
	margin: 0;
	cursor: pointer;
	transition: 0.3s;
}

.date__slide-button:hover {
	color: rgb(78, 78, 78);
}

.date__month {
	text-transform: capitalize;
}

.counter {
	margin-top: 10px;
	padding: 8px 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.counter__label {
	font-weight: bolder;
	font-size: 1.2em;
}

.counter__value {
	margin-top: 15px;
	padding: 5px 33px;
	border-bottom: 8px solid #ffd6fc;
	display: flex;
	color: #9ac7ff;
	font-weight: bold;
	font-size: 2em;
	align-items: center;
	justify-content: center;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import { STATISTIC_CALC_MONTH_COUNTS } from "../stores/statistic";
import { addMonths, format, startOfMonth, subMonths } from "date-fns";

import Title from "../components/Title.svelte";
import ruLocale from "date-fns/locale/ru";
import IoIosArrowBack from "svelte-icons/io/IoIosArrowBack.svelte";
import ImportantMessage from "../components/ImportantMessage.svelte";
import IoIosArrowForward from "svelte-icons/io/IoIosArrowForward.svelte";

const { dispatch, recordsDate, isServicesLoaded, monthCounts } = useStoreon(
	"recordsDate",
	"isServicesLoaded",
	"monthCounts"
);

let statisticDate = $recordsDate;

$: if ($isServicesLoaded) {
	dispatch(STATISTIC_CALC_MONTH_COUNTS, statisticDate);
}

function setNextMonth() {
	statisticDate = startOfMonth(addMonths(statisticDate, 1));
	dispatch(STATISTIC_CALC_MONTH_COUNTS, statisticDate);
}

function setPreviuosMonth() {
	statisticDate = startOfMonth(subMonths(statisticDate, 1));
	dispatch(STATISTIC_CALC_MONTH_COUNTS, statisticDate);
}
</script>

<Title title="Статистика" />

<ImportantMessage style="info">
	Статистика расчитывается с первого до последнего дня месяца. Если открыт текущий месяц,
	то расчет идет от первого числа до текущего календарного дня.
</ImportantMessage>

<div class="date">
	<button on:click="{setPreviuosMonth}" class="date__slide-button">
		<IoIosArrowBack />
	</button>

	<div class="date__month">
		{format(statisticDate, "LLLL yyyy", { locale: ruLocale })}
	</div>

	<button on:click="{setNextMonth}" class="date__slide-button">
		<IoIosArrowForward />
	</button>
</div>

<div class="counter">
	<div class="counter__label">Количество записей</div>
	<div class="counter__value">{$monthCounts.records}</div>
</div>

<div class="counter">
	<div class="counter__label">Заработано</div>
	<div class="counter__value">{$monthCounts.money} руб.</div>
</div>
