import styles from "./Plugs.module.css";

type PlugTextProps = {
	size?: number;
};

export function PlugText(props: PlugTextProps) {
	props.size || (props.size = 40);
	return <span style={{ width: `${props.size}px` }} className={`${styles.text} plug`} />;
}
