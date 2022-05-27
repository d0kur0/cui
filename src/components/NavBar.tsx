import { Link, useLocation } from "solid-app-router";
import { TiBriefcase, TiBusinessCard, TiCalendar, TiChartLine, TiEquals } from "solid-icons/ti";
import { JSX } from "solid-js/jsx-runtime";

import styles from "./NavBar.module.css";

type LinkExtendedProps = {
	to: string;
	icon: JSX.Element;
	title: string;
};

function LinkExtended(props: LinkExtendedProps) {
	const location = useLocation();

	return (
		<Link
			href={props.to}
			classList={{
				[styles.button]: true,
				[styles.buttonActive]: location.pathname === props.to,
			}}
		>
			<span className={styles.linkIcon}>{props.icon}</span>
			<span className={styles.linkName}>{props.title}</span>
		</Link>
	);
}

function NavBar() {
	return (
		<nav className={styles.root}>
			<ul className={styles.list}>
				<li className={styles.link}>
					<LinkExtended to="/" icon={<TiCalendar />} title="Записи" />
				</li>

				<li className={styles.link}>
					<LinkExtended to="/clients" icon={<TiBusinessCard />} title="Клиенты" />
				</li>

				<li className={styles.link}>
					<LinkExtended to="/services" icon={<TiBriefcase />} title="Услуги" />
				</li>

				<li className={styles.link}>
					<LinkExtended to="/stats" icon={<TiChartLine />} title="Статистика" />
				</li>

				<li className={styles.link}>
					<LinkExtended to="/me" icon={<TiEquals />} title="Аккаунт" />
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
