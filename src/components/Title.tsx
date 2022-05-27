import { JSX } from "solid-js";

import styles from "./Title.module.css";

type TitleProps = {
	title: string;
	leftChildren?: JSX.Element;
	rightChildren?: JSX.Element;
};

function Title({ leftChildren, rightChildren, title }: TitleProps) {
	return (
		<div className={styles.root}>
			<div className={styles.optionalElements}>{leftChildren}</div>
			<div className={styles.title}>{title}</div>
			<div className={`${styles.optionalElements} ${styles.optionalElementsRight}`}>{rightChildren}</div>
		</div>
	);
}

export default Title;
