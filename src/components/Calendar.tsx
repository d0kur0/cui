import { addMonths, getDate, startOfMonth, subMonths } from "date-fns";
import { TiChevronLeft, TiChevronRight } from "solid-icons/ti";
import { For, createMemo } from "solid-js";

import { format } from "../helpers/date";
import useMonthDays from "../hooks/useMonthDays";
import { Record } from "../storage/record";
import { recordsStore } from "../stores/records";
import styles from "./Calendar.module.css";

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Calendar() {
	const { records, setCurrentDate } = recordsStore;
	const days = createMemo(() => useMonthDays(records.currentDate, records.list as Record[]));

	const handleCurrentDay = () => setCurrentDate(new Date());
	const handleNextMonth = () => setCurrentDate(startOfMonth(addMonths(records.currentDate, 1)));
	const handlePreviuosMonth = () => setCurrentDate(startOfMonth(subMonths(records.currentDate, 1)));

	return (
		<div className={`${styles.root} ${records.isLoading ? styles.rootAnimated : ""}`}>
			<div className={styles.title}>
				<button onClick={handleCurrentDay}>Сегодня</button>

				<div className={styles.actions}>
					<button onClick={handlePreviuosMonth}>
						<TiChevronLeft />
					</button>

					<button>{format(records.currentDate)}</button>

					<button onClick={handleNextMonth}>
						<TiChevronRight />
					</button>
				</div>
			</div>
			<div className={styles.daysContainer}>
				<div className={styles.dayNames}>
					<For each={dayNames}>{name => <div className={styles.dayName}>{name}</div>}</For>
				</div>

				<div className={styles.days}>
					<For each={days()}>
						{day => (
							<div className={styles.day}>
								<button
									onClick={() => setCurrentDate(day.date)}
									disabled={!day.isActive}
									className={`${styles.dayButton} ${day.isCurrentDate ? styles.dayCurrent : ""}`}>
									{getDate(day.date)}
									{day.counter && <span className={styles.dayCounter}>{day.counter}</span>}
								</button>
							</div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
