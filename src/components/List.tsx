import { Link } from "solid-app-router";
import { JSX, Show } from "solid-js";

import styles from "./List.module.css";

type ListItemProps = {
	href?: string;
	title?: string | JSX.Element;
	content: string | JSX.Element;
	avatar?: JSX.Element;
	onClick?: () => void;
	rightButtons?: JSX.Element;
};

export function ListItem(props: ListItemProps) {
	return (
		<div class={styles.item}>
			<Show when={props.href}>
				<Link class={styles.itemLink} href={props.href || ""} />
			</Show>

			<Show when={props.onClick}>
				<button type="button" class={styles.itemLink} onClick={props.onClick} />
			</Show>

			<Show when={props.avatar}>
				<div class={styles.itemAvatar}>{props.avatar}</div>
			</Show>

			<div class={styles.itemContentWrapper}>
				<Show when={props.title}>
					<div class={styles.itemTitle}>{props.title}</div>
				</Show>
				<div class={styles.itemContent}>{props.content}</div>
			</div>

			<Show when={props.rightButtons}>
				<div class={styles.rightButtons}>{props.rightButtons}</div>
			</Show>
		</div>
	);
}

type AlignValues = "flex-start" | "flex-end" | "center";

type ListItemBetweenContentProps = {
	leftAlign?: AlignValues;
	rightAlign?: AlignValues;
	leftContent: string | JSX.Element;
	rightContent: string | JSX.Element;
};

export function ListItemBetweenContent({ leftContent, rightContent, ...props }: ListItemBetweenContentProps) {
	return (
		<div class={styles.itemBetweenContent} style={{ "--align-self": props.rightAlign || "auto" }}>
			<div class={styles.itemBetweenContentLeft}>{leftContent}</div>
			<div class={styles.itemBetweenContentRight}>{rightContent}</div>
		</div>
	);
}

type ListProps = {
	title?: string;
	margin?: string;
	children: JSX.Element;
};

export function List(props: ListProps) {
	return (
		<div class={styles.root} style={{ margin: props.margin || "" }}>
			<Show when={props.title}>
				<div class={styles.listTitle}>{props.title}</div>
			</Show>
			{props.children}
		</div>
	);
}
