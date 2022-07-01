import styles from "./Divider.module.css";

type DeviderProps = {
	margin?: string;
};

export default function Divider(props: DeviderProps) {
	return <div style={{ margin: props.margin }} className={styles.devider}></div>;
}
