import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { FiPlusSquare } from "solid-icons/fi";
import SearchBar from "../components/SearchBar";

function Clients() {
	return (
		<Layout
			title={
				<Title
					rightChildren={
						<button>
							<FiPlusSquare size={28} />
						</button>
					}
					title="Клиенты"
				/>
			}
			navBar={<NavBar />}>
			<SearchBar />
		</Layout>
	);
}

export default Clients;
