import { Match, Switch } from "solid-js";
import { Transition } from "solid-transition-group";

import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import { userStore } from "../stores/user";
import Loader from "./Loader";
import styles from "./SplashScreen.module.css";

function SplashScreenBody() {
	return (
		<div className={styles.root}>
			<div className={styles.body}>
				<div className={styles.logo}>
					<Loader />
				</div>

				<h3 className={styles.name}>CUI</h3>
			</div>
		</div>
	);
}

function SplashScreen() {
	const { user } = userStore;

	return (
		<Transition mode="outin" onEnter={transitionOnEnter(1000)} onExit={transitionOnExit(1000)}>
			<Switch>
				<Match when={user.isTick}>
					<div style={{ position: "absolute" }}></div>
				</Match>
				<Match when={!user.isTick}>
					<SplashScreenBody />
				</Match>
			</Switch>
		</Transition>
	);
}

export default SplashScreen;
