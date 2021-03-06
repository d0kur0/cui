import { JSX } from "solid-js/jsx-runtime";

import styles from "./modules/Paper.module.css";

type PaperProps = {
	margin?: string;
	padding?: string;
	children: JSX.Element;
	autoHeight?: boolean;
	fixedContent?: JSX.Element;
};

export function Paper(props: PaperProps) {
	const rootStyles: JSX.CSSProperties = {};
	const contentStyles: JSX.CSSProperties = {};

	props.autoHeight && (rootStyles["height"] = "auto");
	props.padding && (contentStyles["padding"] = props.padding);
	props.margin && (contentStyles["margin"] = props.margin);

	return (
		<div class={styles.paper} style={rootStyles}>
			{props.fixedContent && <div class={styles.fixedContent}>{props.fixedContent}</div>}
			<div style={contentStyles} class={styles.content}>
				{props.children}
			</div>
		</div>
	);
}
