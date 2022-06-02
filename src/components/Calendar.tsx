import { getDate } from "date-fns";
import { TiChevronLeft, TiChevronRight } from "solid-icons/ti";
import { For, createMemo } from "solid-js";

import { format } from "../helpers/date";
import useMonthDays from "../hooks/useMonthDays";
import { Record } from "../storage/record";
import { recordsStore } from "../stores/records";
import styles from "./Calendar.module.css";

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Calendar() {
	const { records } = recordsStore;
	const days = createMemo(() => useMonthDays(records.currentDate, records.list as Record[]));

	console.log(days());

	return (
		<div className={styles.root}>
			<div className={styles.title}>
				<div className={styles.currentDate}>{format(records.currentDate)}</div>

				<div className={styles.actions}>
					<button>
						<TiChevronLeft />
					</button>

					<button>Сегодня</button>

					<button>
						<TiChevronRight />
					</button>
				</div>
			</div>
			<div className={styles.dayNames}>
				<For each={dayNames}>{name => <div className={styles.dayName}>{name}</div>}</For>
			</div>

			<div className={styles.days}>
				<For each={days()}>
					{day => (
						<div className={styles.day}>
							<button
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
	);
}

export default Calendar;
