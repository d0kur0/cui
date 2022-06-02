import { format as formatF, formatRelative as formatRelativeFNS } from "date-fns";
import { ru } from "date-fns/locale";

export function formatRelative(date: Date | undefined): string {
	return formatRelativeFNS(date || new Date(), new Date(), { locale: ru });
}

export function format(date: Date): string {
	return formatF(date, "d LLLL yyyy", { locale: ru });
}
