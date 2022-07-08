import { JSX } from "solid-js/jsx-runtime";

import styles from "./Paper.module.css";

type PaperProps = {
	fixedContent?: JSX.Element;
	children: JSX.Element;
	autoHeight?: boolean;
	padding?: string;
	margin?: string;
};

export default function Paper(props: PaperProps) {
	const rootStyles: JSX.CSSProperties = {};
	const contentStyles: JSX.CSSProperties = {};

	props.autoHeight && (rootStyles["height"] = "auto");
	props.padding && (contentStyles["padding"] = props.padding);
	props.margin && (contentStyles["margin"] = props.margin);

	return (
		<div className={styles.paper} style={rootStyles}>
			{props.fixedContent && <div className={styles.fixedContent}>{props.fixedContent}</div>}
			<div style={contentStyles} className={styles.content}>
				{props.children}
			</div>
		</div>
	);
}
