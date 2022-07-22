import { JSX } from "solid-js";

import styles from "./modules/Title.module.css";

type TitleProps = {
	title: string;
	leftChildren?: JSX.Element;
	rightChildren?: JSX.Element;
};

export function Title({ leftChildren, rightChildren, title }: TitleProps) {
	return (
		<div class={styles.root}>
			<div class={styles.optionalElements}>{leftChildren}</div>
			<div class={styles.title}>{title}</div>
			<div classList={{ [styles.optionalElements]: true, [styles.optionalElementsRight]: true }}>
				{rightChildren}
			</div>
		</div>
	);
}
