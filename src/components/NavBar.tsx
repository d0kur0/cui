import { Link, useLocation } from "solid-app-router";
import { TiBriefcase, TiBusinessCard, TiCalendar, TiChartLine, TiEquals } from "solid-icons/ti";
import { JSX } from "solid-js/jsx-runtime";

import styles from "./modules/NavBar.module.css";

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
			}}>
			<span class={styles.linkIcon}>{props.icon}</span>
			<span class={styles.linkName}>{props.title}</span>
		</Link>
	);
}

export function NavBar() {
	return (
		<nav class={styles.root}>
			<ul class={styles.list}>
				<li class={styles.link}>
					<LinkExtended to="/" icon={<TiCalendar />} title="Записи" />
				</li>

				<li class={styles.link}>
					<LinkExtended to="/clients" icon={<TiBusinessCard />} title="Клиенты" />
				</li>

				<li class={styles.link}>
					<LinkExtended to="/services" icon={<TiBriefcase />} title="Услуги" />
				</li>

				<li class={styles.link}>
					<LinkExtended to="/stats" icon={<TiChartLine />} title="Статистика" />
				</li>

				<li class={styles.link}>
					<LinkExtended to="/me" icon={<TiEquals />} title="Аккаунт" />
				</li>
			</ul>
		</nav>
	);
}
