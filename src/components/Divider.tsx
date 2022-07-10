import styles from "./Divider.module.css";

type DividerProps = {
	margin?: string;
};

export default function Divider(props: DividerProps) {
	return <div style={{ margin: props.margin }} class={styles.divider}></div>;
}

export function DividerTime(props: { children: string }) {
	return <div class={styles.dividerTime}>{props.children}</div>;
}
