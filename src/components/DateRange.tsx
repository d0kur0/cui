import { addMonths, endOfMonth, startOfMonth, subMonths } from "date-fns";
import { FaSolidLeftLong, FaSolidRightLong } from "solid-icons/fa";
import { createSignal } from "solid-js";

import { StatisticDateRange } from "../stores/statistics";

import { formatForInput } from "../helpers/date";
import { Button } from "./Form";
import styles from "./modules/DateRange.module.css";

export type DateRangeProps = {
	end: Date;
	start: Date;
	onChange?: (dates: StatisticDateRange) => void;
};

type DateChangeHandler = (e: Event & { currentTarget: HTMLInputElement }) => void;

export function DateRange({ start, end, onChange }: DateRangeProps) {
	const [dates, setDates] = createSignal({ start, end });

	const handleChangeStart: DateChangeHandler = ({ currentTarget }) => {
		setDates(dates => {
			dates = { ...dates, start: new Date(currentTarget.value) };
			onChange?.(dates);
			return dates;
		});
	};

	const handleChangeEnd: DateChangeHandler = ({ currentTarget }) => {
		setDates(dates => {
			dates = { ...dates, end: new Date(currentTarget.value) };
			onChange?.(dates);
			return dates;
		});
	};

	const handleSetPreviousMonth = () => {
		setDates(dates => {
			dates = {
				...dates,
				end: startOfMonth(subMonths(dates.start, 1)),
				start: endOfMonth(subMonths(dates.start, 1)),
			};
			onChange?.(dates);
			return dates;
		});
	};

	const handleSetNextMonth = () => {
		setDates(dates => {
			dates = {
				...dates,
				end: startOfMonth(addMonths(dates.start, 1)),
				start: endOfMonth(addMonths(dates.start, 1)),
			};
			onChange?.(dates);
			return dates;
		});
	};

	return (
		<div class={styles.root}>
			<label class={styles.label}>
				<div class={styles.labelText}>
					<button onClick={handleSetPreviousMonth} class={styles.button}>
						<FaSolidLeftLong />
					</button>
					Дата начала
				</div>
				<input
					type="date"
					value={formatForInput(dates().start, true)}
					class={styles.input}
					onChange={handleChangeStart}
				/>
			</label>

			<label class={styles.label}>
				<div classList={{ [styles.labelText]: true, [styles.labelTextEnd]: true }}>
					Дата конца
					<button onClick={handleSetNextMonth} class={styles.button}>
						<FaSolidRightLong />
					</button>
				</div>
				<input
					type="date"
					value={formatForInput(dates().end, true)}
					class={styles.input}
					onChange={handleChangeEnd}
				/>
			</label>
		</div>
	);
}
