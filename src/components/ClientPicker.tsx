import { clientsStore } from "../stores/clients";
import styles from "./ClientPicker.module.css";
import ModalPicker from "./ModalPicker";

function ClientPicker() {
	const handleChoice = (event: Event) => {
		event.preventDefault();
	};

	return (
		<div className={styles.wrapper}>
			<ModalPicker isOpen={true} elements={clientsStore.clients.list} multiple={false} />

			<div className={styles.label}>Клиент*</div>
			<div className={styles.input}>
				<button onClick={handleChoice} className={styles.choiceButton}>
					Выберите клиента
				</button>
			</div>
			<input type="hidden" value="123"></input>
		</div>
	);
}

export default ClientPicker;
