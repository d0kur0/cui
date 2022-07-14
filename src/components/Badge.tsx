import { JSX } from "solid-js/jsx-runtime";

import styles from "./Badge.module.css";

type BadgeGridProps = {
	gap?: string;
	children: JSX.Element | string;
};

export function BadgeGrid({ gap, children }: BadgeGridProps) {
	return (
		<div style={{ gap: gap || "5px" }} class={styles.grid}>
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
