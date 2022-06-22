import { Link } from "solid-app-router";
import { JSX } from "solid-js";

import styles from "./List.module.css";

type ListItemProps = {
	title?: string | JSX.Element;
	content: string | JSX.Element;
	avatar?: JSX.Element;
	rightButtons?: JSX.Element;
	href?: string;
	onClick?: () => void;
};

export function ListItem(props: ListItemProps) {
	return (
		<div className={styles.item}>
			{props.href && <Link className={styles.itemLink} href={props.href} />}
			{props.onClick && <button className={styles.itemLink} onClick={props.onClick} />}
			{props.avatar && <div className={styles.itemAvatar}>{props.avatar}</div>}
			<div className={styles.itemContentWrapper}>
				{props.title && <div className={styles.itemTitle}>{props.title}</div>}
				<div className={styles.itemContent}>{props.content}</div>
			</div>
			{props.rightButtons && <div className={styles.rightButtons}>{props.rightButtons}</div>}
		</div>
	);
}

type AlignValues = "flex-start" | "flex-end" | "center";

type ListItemBetweenContentProps = {
	leftContent: string | JSX.Element;
	rightContent: string | JSX.Element;
	rightAlign?: AlignValues;
	leftAlign?: AlignValues;
};

export function ListItemBetweenContent({ leftContent, rightContent, ...props }: ListItemBetweenContentProps) {
	return (
		<div className={styles.itemBetweenContent}>
			<div style={{ "align-self": props.rightAlign || "auto" }} className={styles.itemBetweenContentLeft}>
				{leftContent}
			</div>
			<div style={{ "align-self": props.rightAlign || "auto" }} className={styles.itemBetweenContentRight}>
				{rightContent}
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
