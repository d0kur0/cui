import Title from "../components/Title";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Layout from "../components/Layout";
import { BsArrowLeft } from "solid-icons/bs";
import { useParams } from "solid-app-router";
import { clientsStore } from "../stores/clients";
import { createMemo } from "solid-js";

export function Client() {
	const { id } = useParams();
	const { clients } = clientsStore;

	const client = createMemo(() => clients.list.find(client => client.id === id));

	return (
		<Layout
			title={
				<Title
					leftChildren={
						<button onClick={() => history.back()}>
							<BsArrowLeft size={24} />
						</button>
					}
					title="Профиль клиента"
				/>
			}
			navBar={<NavBar />}>
			<Paper content={<>{client()?.name} </>} />
		</Layout>
	);
}
