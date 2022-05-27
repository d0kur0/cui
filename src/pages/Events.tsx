import { FiPlusSquare } from "solid-icons/fi";

import Calendar from "../components/Calendar";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Title from "../components/Title";

function Events() {
	return (
		<Layout
			title={
				<Title
					rightChildren={
						<button>
							<FiPlusSquare size={28} />
						</button>
					}
					title="Записи"
				/>
			}
			navBar={<NavBar />}
		>
			<Calendar />
		</Layout>
	);
}

export default Events;
