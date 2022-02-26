import styles from "./NavBar.module.css";
import {
	TiCalendar,
	TiBusinessCard,
	TiBriefcase,
	TiChartLine,
	TiEquals,
} from "solid-icons/ti";

function NavBar() {
	return (
		<nav className={styles.root}>
			<ul className={styles.list}>
				<li className={styles.link}>
					<a className={`${styles.button} ${styles.buttonActive}`}>
						<span className={styles.linkIcon}>
							<TiCalendar />
						</span>
						<span className={styles.linkName}>Записи</span>
					</a>
				</li>

				<li className={styles.link}>
					<a className={styles.button}>
						<span className={styles.linkIcon}>
							<TiBusinessCard />
						</span>
						<span className={styles.linkName}>Клиенты</span>
					</a>
				</li>

				<li className={styles.link}>
					<a className={styles.button}>
						<span className={styles.linkIcon}>
							<TiBriefcase />
						</span>
						<span className={styles.linkName}>Услуги</span>
					</a>
				</li>

				<li className={styles.link}>
					<a className={styles.button}>
						<span className={styles.linkIcon}>
							<TiChartLine />
						</span>
						<span className={styles.linkName}>Статистика</span>
					</a>
				</li>

				<li className={styles.link}>
					<a className={styles.button}>
						<span className={styles.linkIcon}>
							<TiEquals />
						</span>
						<span className={styles.linkName}>Аккаунт</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
