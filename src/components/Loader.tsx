import styles from "./Loader.module.css";

type LoaderProps = {
	width?: string;
	height?: string;
};

function Loader({ width, height }: LoaderProps) {
	return (
		<svg style={{ width, height }} className={styles.spinner} viewBox="0 0 50 50">
			<circle cx="25" cy="25" r="20" fill="none" stroke-width="4" />
		</svg>
	);
}

export default Loader;
