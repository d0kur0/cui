import { createStore } from "solid-js/store";

import { NOTIFICATION_TIMEOUT } from "../configs/notifications";

type NotificationType = "error" | "warning" | "success";

type Notification = {
	label: number;
	message: string;
	type: NotificationType;
	timeout: NodeJS.Timeout | null;
};

type NotificationStore = { list: Notification[] };

type PushNotificationProps = { message: string; type: NotificationType };

export function createNotificationsStore() {
	const [notifications, setNotifications] = createStore<NotificationStore>({ list: [] });

	const pushNotification = (props: PushNotificationProps) => {
		const label = +new Date();

		const timeout = setTimeout(
			() =>
				setNotifications(notifications => ({
					list: notifications.list.filter(notification => notification.label !== label),
				})),
			NOTIFICATION_TIMEOUT * 1000
		);

		setNotifications(notifications => ({
			list: [...notifications.list, { ...props, label, timeout }],
		}));
	};

	const pushError = (message: string) => {
		pushNotification({ type: "error", message });
	};

	const pushSuccess = (message: string) => {
		pushNotification({ type: "success", message });
	};

	const pushWarning = (message: string) => {
		pushNotification({ type: "warning", message });
	};

	const discardNotification = (notificationId: number) => {
		setNotifications(notifications => ({
			list: notifications.list.filter((notification, id) => {
				if (notificationId !== id) return true;
				notification.timeout && clearTimeout(notification.timeout);
				return false;
			}),
		}));
	};

	return {
		notifications,
		pushError,
		pushSuccess,
		pushWarning,
		discardNotification,
	};
}

export const notificationsStore = createNotificationsStore();
