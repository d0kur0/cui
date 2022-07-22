import { add, eachDayOfInterval, endOfMonth, getDay, isEqual, startOfMonth, sub } from "date-fns";

import { Record } from "../storage/record";

export function useMonthDays(recordsDate: Date, records: Record[]) {
	let allDaysInMonth: Date[] = [];

	try {
		allDaysInMonth = eachDayOfInterval({
			start: startOfMonth(recordsDate),
			end: endOfMonth(recordsDate),
		});
	} catch (e) {
		console.warn("error on allDaysInMonth");
	}

	const firstWeekDay = getDay(allDaysInMonth[0]) || 7;

	let firstOffsetDays: Date[] = [];
	if (firstWeekDay > 1) {
		firstOffsetDays = eachDayOfInterval({
			start: sub(allDaysInMonth[0], { days: firstWeekDay - 1 }),
			end: sub(allDaysInMonth[0], { days: 1 }),
		});
	}

	let lastOffsetDays: Date[] = [];
	const missingDays = 42 - (allDaysInMonth.length + firstOffsetDays.length);

	if (missingDays) {
		const lastDayOfMonth = allDaysInMonth[allDaysInMonth.length - 1];

		try {
			lastOffsetDays = eachDayOfInterval({
				start: add(lastDayOfMonth, { days: 1 }),
				end: add(lastDayOfMonth, { days: missingDays }),
			});
		} catch (error) {
			console.warn("error on lastOffsetDays");
		}
	}

	const recordWithZeroTime = records.map(record => {
		const date = record.date.toDate();
		date.setHours(0, 0, 0);
		return { ...record, date };
	});

	recordsDate.setHours(0, 0, 0);

	const monthDays = allDaysInMonth.map(date => {
		return {
			date,
			isActive: true,
			isCurrentDate: date.toDateString() === recordsDate.toDateString(),
			counter: recordWithZeroTime.reduce((acc, r) => acc + +isEqual(r.date, date), 0),
		};
	});

	const fillDayObject = (date: Date) => ({ date, isActive: false, counter: 0, isCurrentDate: false });
	return [...firstOffsetDays.map(fillDayObject), ...monthDays, ...lastOffsetDays.map(fillDayObject)];
}
