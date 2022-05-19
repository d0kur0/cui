import styles from "./List.module.css";
import { JSX } from "solid-js";

type ListItemProps = {
	title?: string;
	content: string;
	avatar?: JSX.Element;
	rightButtons?: JSX.Element;
};

export function ListItem(props: ListItemProps) {
	return (
		<div className={styles.item}>
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

type ListPlugProps = {
	itemsCount: number;
};

export function ListPlug(props: ListPlugProps) {
	return (
		<List title="Список клиентов" margin="5px 0">
			{Array(props.itemsCount)
				.fill(0)
				.map(() => (
					<div className={styles.item}>
						<div className={styles.itemAvatar}>
							<div className={styles.plugAvatar}></div>
						</div>

						<div className={styles.itemContentWrapper}>
							<div className={styles.itemTitle}>
								<span className={styles.itemTitlePlug} />
							</div>
							<div className={styles.itemContent}>
								<span className={styles.itemContentPlug} />
							</div>
						</div>
					</div>
				))}
		</List>
	);
}
