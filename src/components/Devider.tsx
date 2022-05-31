import styles from "./Devider.module.css";

type DeviderProps = {
	margin?: string;
};

export default function Devider(props: DeviderProps) {
	return <div style={{ margin: props.margin }} className={styles.devider}></div>;
}
