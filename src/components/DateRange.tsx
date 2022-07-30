import { createSignal } from "solid-js";

import { StatisticDateRange } from "../stores/statistics";

import { formatForInput } from "../helpers/date";
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

	return (
		<div class={styles.root}>
			<label class={styles.label}>
				<div class={styles.labelText}>Дата начала</div>
				<input
					type="date"
					value={formatForInput(dates().start, true)}
					class={styles.input}
					onChange={handleChangeStart}
				/>
			</label>

			<label class={styles.label}>
				<div classList={{ [styles.labelText]: true, [styles.labelTextEnd]: true }}>Дата конца</div>
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
