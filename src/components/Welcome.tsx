import welcomeSvg from "../assets/welcome.svg";
import { useStore } from "../stores";
import styles from "./modules/Welcome.module.css";

export function Welcome() {
	const { signIn } = useStore("user");

	return (
		<div class={styles.root}>
			<div class={styles.body}>
				<h1 class={styles.name}>CUI</h1>
				<div class={styles.description}>
					Приложение для менеджента <br /> записей, клиентов и услуг.
				</div>

				<ul class={styles.features}>
					<li>Progressive Web App</li>
					<li>Статистики и отчеты</li>
					<li>Работа оффлайн</li>
					<li>Бесплатно</li>
				</ul>
			</div>

			<div class={styles.logoRoot}>
				<img alt="welcome image" class={styles.logo} src={welcomeSvg} />
			</div>

			<div class={styles.footer}>
				<button onClick={signIn} class={styles.signIn}>
					Войти используя Google
				</button>
			</div>
		</div>
	);
}
