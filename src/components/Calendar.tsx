import { getDate } from "date-fns";
import { TiChevronLeft, TiChevronRight } from "solid-icons/ti";
import { For } from "solid-js";

import useMonthDays from "../hooks/useMonthDays";
import styles from "./Calendar.module.css";

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Calendar() {
	const days = useMonthDays(new Date());

	return (
		<div className={styles.root}>
			<div className={styles.title}>
				<button>
					<TiChevronLeft />
				</button>

				<button>Сегодня</button>

				<button>
					<TiChevronRight />
				</button>
			</div>
			<div className={styles.dayNames}>
				<For each={dayNames}>{name => <div className={styles.dayName}>{name}</div>}</For>
			</div>

			<div className={styles.days}>
				<For each={days}>
					{day => (
						<div className={styles.day}>
							<button disabled={!day.isActive}>{getDate(day.date)}</button>
						</div>
					)}
				</For>
			</div>
		</div>
	);
}

export default Calendar;
