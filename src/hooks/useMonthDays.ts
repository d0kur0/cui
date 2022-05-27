import { add, eachDayOfInterval, endOfMonth, getDay, startOfMonth, sub } from "date-fns";

function useMonthDays(recordsDate: Date) {
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

	return [
		...firstOffsetDays.map(date => ({ date, isActive: false })),
		...allDaysInMonth.map(date => ({ date, isActive: true })),
		...lastOffsetDays.map(date => ({ date, isActive: false })),
	];
}

export default useMonthDays;
