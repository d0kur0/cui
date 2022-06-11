import { JSX } from "solid-js/jsx-runtime";

import styles from "./Badge.module.css";

type BadgeGridProps = {
	children: JSX.Element | string;
	gap?: string;
};

export function BadgeGrid({ gap, children }: BadgeGridProps) {
	return (
		<div style={{ gap: gap || "5px" }} className={styles.badgeGrid}>
			{children}
		</div>
	);
}

type BadgeProps = {
	children: JSX.Element | string;
};

export function Badge({ children }: BadgeProps) {
	return <span className={styles.badge}>{children}</span>;
}
