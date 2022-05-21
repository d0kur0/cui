import styles from "./Plugs.module.css";

type PlugTextProps = {
	size?: number;
	height?: string;
};

export function PlugText(props: PlugTextProps) {
	props.size || (props.size = 40);
	props.height || (props.height = "0.9em");
	return (
		<span
			style={{ width: `${props.size}px`, height: props.height }}
			className={`${styles.text} plug`}
		/>
	);
}
