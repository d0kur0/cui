import { JSX } from "solid-js";

import styles from "./modules/Card.module.css";

type BaseComponentProps = { children: JSX.Element };

type CardProps = BaseComponentProps;
type CardMainRow = BaseComponentProps;
type CardListProps = BaseComponentProps;
type CardSecondRow = BaseComponentProps;
type CardInfoProps = BaseComponentProps;
type CardAvatarProps = BaseComponentProps;
type CardHeaderProps = BaseComponentProps;

type CardListItemProps = {
	name: JSX.Element | string;
	value: JSX.Element | string;
};

export function Card({ children }: CardProps) {
	return children;
}

export function CardInfo({ children }: CardInfoProps) {
	return <div class={styles.cardInfo}>{children}</div>;
}

export function CardHeader({ children }: CardHeaderProps) {
	return <div class={styles.card}>{children}</div>;
}

export function CardList({ children }: CardListProps) {
	return <div class={styles.statistic}>{children}</div>;
}

export function CardListItem({ name, value }: CardListItemProps) {
	return (
		<div class={styles.statisticItem}>
			<div>{name}</div>
			<div>{value}</div>
		</div>
	);
}

export function CardAvatar({ children }: CardAvatarProps) {
	return <div class={styles.cardAvatar}>{children}</div>;
}

export function CardMainRow({ children }: CardMainRow) {
	return <div class={styles.cardInfoName}>{children}</div>;
}

export function CardSecondRow({ children }: CardSecondRow) {
	return <div class={styles.cardDescription}>{children}</div>;
}
