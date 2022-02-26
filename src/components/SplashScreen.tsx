import styles from "./SplashScreen.module.css";
import { Transition } from "solid-transition-group";
import { useUserStore } from "../stores/user";
import { ImSpinner10 } from "solid-icons/im";
import Loader from "./Loader";

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
	const { user } = useUserStore();

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
			{user.isTick || <SplashScreenBody />}
		</Transition>
	);
}

export default SplashScreen;
