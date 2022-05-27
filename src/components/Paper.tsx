import styles from "./Paper.module.css";
import { JSX } from "solid-js/jsx-runtime";
import { Button } from "./Form";

type PaperProps = {
	fixedContent?: JSX.Element;
	children: JSX.Element;
	autoHeight?: boolean;
	padding?: string;
};

export default function Paper(props: PaperProps) {
	const rootStyles: JSX.CSSProperties = {};
	const contentStyles: JSX.CSSProperties = {};

	props.autoHeight && (rootStyles["height"] = "auto");
	props.padding && (contentStyles["padding"] = props.padding);

	return (
		<div className={styles.paper} style={rootStyles}>
			{props.fixedContent && (
				<div className={styles.fixedContent}>{props.fixedContent}</div>
			)}
			<div style={contentStyles} className={styles.content}>
				{props.children}
			</div>
		</div>
	);
}