import { Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

import styles from "./Layout.module.css";

type LayoutProps = {
	title?: JSX.Element;
	navBar?: JSX.Element;
	children?: JSX.Element;
};

function Layout({ navBar, title, children }: LayoutProps) {
	const inlineStyles: JSX.CSSProperties = {};

	navBar || (inlineStyles["--navBar-height"] = "0px");
	title || (inlineStyles["--title-height"] = "0px");

	return (
		<div class={styles.root} style={inlineStyles}>
			<Show when={title}>
				<div class={styles.title}>{title}</div>
			</Show>

			<div class={styles.body}>
				<div class={styles.bodyWrapper}>{children}</div>
			</div>

			<Show when={navBar}>
				<div class={styles.navBar}>{navBar}</div>
			</Show>
		</div>
	);
}

export default Layout;
