import styles from "./Welcome.module.css";
import { useUserStore } from "../stores/user";

function Welcome() {
	const { signIn } = useUserStore();

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
				<img className={styles.logo} src="/src/assets/undraw_messaging_fun_re_vic9.svg" />
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
