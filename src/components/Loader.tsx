import styles from "./modules/Loader.module.css";

type LoaderProps = {
	width?: string;
	height?: string;
};

export function Loader({ width, height }: LoaderProps) {
	return (
		<svg style={{ width, height }} class={styles.spinner} viewBox="0 0 50 50">
			<circle cx="25" cy="25" r="20" fill="none" stroke-width="4" />
		</svg>
	);
}
