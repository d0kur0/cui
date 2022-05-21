import styles from "./List.module.css";
import { JSX } from "solid-js";
import { Link } from "solid-app-router";

type ListItemProps = {
	title?: string | JSX.Element;
	content: string | JSX.Element;
	avatar?: JSX.Element;
	rightButtons?: JSX.Element;
	href?: string;
};

export function ListItem(props: ListItemProps) {
	return (
		<div className={styles.item}>
			{props.href && <Link className={styles.itemLink} href={props.href} />}
			{props.avatar && <div className={styles.itemAvatar}>{props.avatar}</div>}
			<div className={styles.itemContentWrapper}>
				{props.title && <div className={styles.itemTitle}>{props.title}</div>}
				<div className={styles.itemContent}>{props.content}</div>
			</div>
		</div>
	);
}

type ListProps = {
	children: JSX.Element;
	margin?: string;
	title?: string;
};

export function List(props: ListProps) {
	return (
		<div className={styles.root} style={{ margin: props.margin || "" }}>
			{props.title && <div className={styles.listTitle}>{props.title}</div>}
			{props.children}
		</div>
	);
}
