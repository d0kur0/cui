import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { FiPlusSquare } from "solid-icons/fi";
import SearchBar from "../components/SearchBar";
import { createMemo, createSignal } from "solid-js";
import { List, ListItem } from "../components/List";
import Paper from "../components/Paper";
import { Transition } from "solid-transition-group";
import { clientsStore } from "../stores/clients";
import { Avatar } from "../components/Avatar";
import { PlugText } from "../components/Plugs";

function ListPlug() {
	return (
		<List title="Список клиентов" margin="5px 0">
			{Array(10)
				.fill(0)
				.map(() => (
					<ListItem
						avatar={<Avatar isPlug={true} />}
						title={<PlugText size={80} />}
						content={<PlugText size={160} />}
					/>
				))}
		</List>
	);
}

function Clients() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const { clients } = clientsStore;

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
						href={`/client/${client.id}`}
						avatar={<Avatar name={client.name} />}
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
						{clients.isLoading ? <ListPlug /> : <RenderList />}
					</Transition>
				}
			/>
		</Layout>
	);
}

export default Clients;
