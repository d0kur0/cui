import welcomeSvg from "../assets/welcome.svg";
import { userStore } from "../stores/user";
import styles from "./Welcome.module.css";

function Welcome() {
	const { signIn } = userStore;

	return (
		<div className={styles.root}>
			<div className={styles.body}>
				<h1 className={styles.name}>CUI</h1>
				<div className={styles.description}>
					Приложение для менеджента <br /> записей, клиентов и услуг.
				</div>

				<ul className={styles.features}>
					<li>Progressive Web App</li>
					<li>Статистики и отчеты</li>
					<li>Работа оффлайн</li>
					<li>Бесплатно</li>
				</ul>
			</div>

			<div className={styles.logoRoot}>
				<img alt="welcome image" className={styles.logo} src={welcomeSvg} />
			</div>

			<div className={styles.footer}>
				<button onClick={signIn} className={styles.signIn}>
					Войти используя Google
				</button>
			</div>
		</div>
	);
}

export default Welcome;
