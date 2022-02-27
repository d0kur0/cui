import styles from "./Loader.module.css";

function Loader() {
	return (
		<svg className={styles.spinner} viewBox="0 0 50 50">
			<circle cx="25" cy="25" r="20" fill="none" stroke-width="4" />
		</svg>
	);
}

export default Loader;
