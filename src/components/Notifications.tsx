import styles from "./Notifications.module.css";
import { notificationsStore } from "../stores/notifications";
import { IoClose } from "solid-icons/io";

export function Notifications() {
	const { notifications, discardNotification, pushNotification } = notificationsStore;

	return (
		<div className={styles.notifications}>
			{notifications.list.map((notification, id) => (
				<div
					className={`${styles.notification} ${
						{
							error: styles.notificationError,
							success: styles.notificationSuccess,
							warning: styles.notificationWarning,
						}[notification.type]
					}`}>
					{notification.message}
					<button onClick={() => discardNotification(id)} className={styles.closeButton}>
						<IoClose size={24} />
					</button>
				</div>
			))}
		</div>
	);
}
