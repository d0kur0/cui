import styles from "./Paper.module.css";
import { JSX } from "solid-js/jsx-runtime";

type PaperProps = {
	fixedContent?: JSX.Element;
	content: JSX.Element;
};

export default function Paper(props: PaperProps) {
	return (
		<div className={styles.paper}>
			{props.fixedContent && (
				<div className={styles.fixedContent}>{props.fixedContent}</div>
			)}
			<div className={styles.content}>{props.content}</div>
		</div>
	);
}
