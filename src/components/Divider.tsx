import styles from "./modules/Divider.module.css";

type DividerProps = {
	margin?: string;
};

export function Divider(props: DividerProps) {
	return <div style={{ margin: props.margin }} class={styles.divider}></div>;
}
