import { addMonths, getDate, startOfMonth, subMonths } from "date-fns";
import { TiChevronLeft, TiChevronRight } from "solid-icons/ti";
import { For, Show, createMemo } from "solid-js";

import { useMonthDays } from "../hooks/useMonthDays";

import { format } from "../helpers/date";
import { Record } from "../storage/record";
import { useStore } from "../stores";
import styles from "./modules/Calendar.module.css";

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function Calendar() {
	const { records, setCurrentDate } = useStore("records");
	const days = createMemo(() => useMonthDays(records.currentDate, records.list as Record[]));

	const handleCurrentDay = () => setCurrentDate(new Date());
	const handleNextMonth = () => setCurrentDate(startOfMonth(addMonths(records.currentDate, 1)));
	const handlePreviousMonth = () => setCurrentDate(startOfMonth(subMonths(records.currentDate, 1)));

	return (
		<div class={`${styles.root} ${records.isLoading ? styles.rootAnimated : ""}`}>
			<div class={styles.title}>
				<button onClick={handleCurrentDay}>Сегодня</button>

				<div class={styles.actions}>
					<button onClick={handlePreviousMonth}>
						<TiChevronLeft />
					</button>

					<button>{format(records.currentDate)}</button>

					<button onClick={handleNextMonth}>
						<TiChevronRight />
					</button>
				</div>
			</div>
			<div class={styles.daysContainer}>
				<div class={styles.dayNames}>
					<For each={dayNames}>{name => <div class={styles.dayName}>{name}</div>}</For>
				</div>

				<div class={styles.days}>
					<For each={days()}>
						{day => (
							<div class={styles.day}>
								<button
									onClick={() => setCurrentDate(day.date)}
									disabled={!day.isActive}
									classList={{ [styles.dayButton]: true, [styles.dayCurrent]: day.isCurrentDate }}>
									{getDate(day.date)}
									<Show when={day.counter}>
										<span class={styles.dayCounter}>{day.counter}</span>
									</Show>
								</button>
							</div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
}
