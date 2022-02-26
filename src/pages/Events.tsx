import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Title from "../components/Title";

import Calendar from "../components/Calendar";

function Events() {
	return (
		<Layout
			title={<Title rightChildren={<button>Добавить</button>} title="Записи" />}
			navBar={<NavBar />}>
			<Calendar />
		</Layout>
	);
}

export default Events;
