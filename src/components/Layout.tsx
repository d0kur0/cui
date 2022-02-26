import { JSX } from "solid-js/jsx-runtime";
import styles from "./Layout.module.css";

type LayoutProps = {
	title?: JSX.Element;
	navBar?: JSX.Element;
	children?: JSX.Element;
};

function Layout({ navBar, title, children }: LayoutProps) {
	const inlineStyles: JSX.CSSProperties = {};
	if (!navBar) inlineStyles["--navBar-height"] = "0px";
	if (!title) inlineStyles["--title-height"] = "0px";

	return (
		<div className={styles.root} style={inlineStyles}>
			{title && <div className={styles.title}>{title}</div>}

			<div className={styles.body}>
				<div className={styles.bodyWrapper}>{children}</div>
			</div>

			{navBar && <div className={styles.navBar}>{navBar}</div>}
		</div>
	);
}

export default Layout;
