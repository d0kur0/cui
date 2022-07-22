import { IoClose } from "solid-icons/io";

import { useStore } from "../stores";
import styles from "./modules/Notifications.module.css";

export function Notifications() {
	const { notifications, discardNotification } = useStore("notifications");

	return (
		<div class={styles.notifications}>
			{notifications.list.map((notification, id) => (
				<div
					class={`${styles.notification} ${
						{
							error: styles.notificationError,
							success: styles.notificationSuccess,
							warning: styles.notificationWarning,
						}[notification.type]
					}`}>
					{notification.message}
					<button onClick={() => discardNotification(id)} class={styles.closeButton}>
						<IoClose size={24} />
					</button>
				</div>
			))}
		</div>
	);
}
