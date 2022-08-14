import { JSX } from "solid-js/jsx-runtime";

import styles from "./modules/Badge.module.css";

type BadgeGridProps = {
	gap?: string;
	margin?: string;
	children: JSX.Element | string;
};

export function BadgeGrid({ gap, children, margin }: BadgeGridProps) {
	return (
		<div style={{ gap: gap || "5px", margin: margin || "0" }} class={styles.grid}>
			{children}
		</div>
	);
}

type BadgeProps = {
	children: JSX.Element | string;
};

export function Badge({ children }: BadgeProps) {
	return <span class={styles.badge}>{children}</span>;
}
