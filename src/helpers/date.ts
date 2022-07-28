import { format as formatF, formatRelative as formatRelativeF } from "date-fns";
import { ru } from "date-fns/locale";

export function formatRelative(date: Date | undefined) {
	return formatRelativeF(date || new Date(), new Date(), { locale: ru });
}

export function format(date: Date) {
	return formatF(date, "d LLLL yyyy", { locale: ru });
}

export function formatForInput(date: Date | undefined, skipTime = false) {
	return formatF(date || new Date(), `yyyy-MM-dd${skipTime ? "" : "'T'HH:mm"}`);
}
