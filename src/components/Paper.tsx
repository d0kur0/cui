import styles from "./Paper.module.css";
import { JSX } from "solid-js/jsx-runtime";

type PaperProps = {
	fixedContent?: JSX.Element;
	children: JSX.Element;
	autoHeight?: boolean;
};

export default function Paper(props: PaperProps) {
	const inlineStyles: JSX.CSSProperties = {};

	if (props.autoHeight) inlineStyles["height"] = "auto";

	return (
		<div className={styles.paper} style={inlineStyles}>
			{props.fixedContent && (
				<div className={styles.fixedContent}>{props.fixedContent}</div>
			)}
			<div className={styles.content}>{props.children}</div>
		</div>
	);
}
