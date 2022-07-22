import styles from "./modules/Plugs.module.css";

type PlugTextProps = {
	width?: number;
	height?: string;
};

export function PlugText({ width, height }: PlugTextProps) {
	width = width || 40;
	height = height || "0.9em";
	return <span style={{ width: `${width}px`, height }} classList={{ [styles.text]: true, plug: true }} />;
}
