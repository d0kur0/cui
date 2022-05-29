import { Transition } from "solid-transition-group";

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

// For fix error of Transition component, needed real html element, not <></>
function SplashPlug() {
	return <div style={{ position: "absolute" }}></div>;
}

function SplashScreen() {
	const { user } = userStore;

	return (
		<Transition
			mode="outin"
			onEnter={(el, done) => {
				const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
				a.finished.then(done);
			}}
			onExit={(el, done) => {
				const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1000 });
				a.finished.then(done);
			}}>
			{user.isTick ? <SplashPlug /> : <SplashScreenBody />}
		</Transition>
	);
}

export default SplashScreen;
