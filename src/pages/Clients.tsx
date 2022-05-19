import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { FiPlusSquare } from "solid-icons/fi";
import SearchBar from "../components/SearchBar";
import { createMemo, createSignal } from "solid-js";
import { List, ListItem, ListPlug } from "../components/List";
import { useClientsStore } from "../stores/clients";
import { userStore } from "../stores/user";
import Paper from "../components/Paper";
import { Transition } from "solid-transition-group";

function Clients() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const { user } = userStore;
	const { clients } = useClientsStore(user.id);

	const filteredClients = createMemo(() => {
		if (!searchQuery()) return clients.list;
		return clients.list.filter(
			client =>
				client.name.toLowerCase().includes(searchQuery().toLowerCase()) ||
				client.description.toLowerCase().includes(searchQuery().toLowerCase())
		);
	});

	const RenderList = () => {
		return (
			<List title="Список клиентов" margin="5px 0">
				{filteredClients().map(client => (
					<ListItem
						avatar={
							<div
								style={{
									width: "40px",
									height: "40px",
									background: "var(--plug-color)",
									"border-radius": "50%",
								}}></div>
						}
						title={client.name}
						content={client.description.trim() ? client.description : "empty description"}
					/>
				))}
			</List>
		);
	};

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
			<Paper
				fixedContent={<SearchBar onInput={value => setSearchQuery(value)} />}
				content={
					<Transition
						mode="outin"
						onEnter={(el, done) => {
							const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
							a.finished.then(done);
						}}
						onExit={(el, done) => {
							const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 });
							a.finished.then(done);
						}}>
						{clients.isLoading ? <ListPlug itemsCount={15} /> : <RenderList />}
					</Transition>
				}
			/>
		</Layout>
	);
}

export default Clients;
