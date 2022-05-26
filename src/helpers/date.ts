import { formatRelative as formatRelativeFNS } from "date-fns";
import { ru } from "date-fns/locale";

export function formatRelative(date: Date | undefined): string {
	return formatRelativeFNS(date || new Date(), new Date(), { locale: ru });
}
