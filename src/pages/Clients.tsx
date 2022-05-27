import { Link } from "solid-app-router";
import { FiPlusSquare } from "solid-icons/fi";
import { createMemo, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
import Layout from "../components/Layout";
import { List, ListItem } from "../components/List";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { PlugText } from "../components/Plugs";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import { clientsStore } from "../stores/clients";

function ClientListPlug() {
	return (
		<List title="Список клиентов" margin="5px 0">
			{Array(9)
				.fill(0)
				.map(() => (
					<ListItem
						avatar={<Avatar isPlug={true} />}
						title={<PlugText size={80} height={"0.7em"} />}
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

	const ClientList = () => {
		return (
			<List title="Список клиентов" margin="5px 0">
				{filteredClients().map(client => (
					<ListItem
						href={`/client/${client.id}`}
						avatar={<Avatar name={client.name} imageSrc={client.avatar} />}
						title={client.name}
						content={
							client.description.trim() ? client.description : "Описание отсутствует"
						}
					/>
				))}

				{filteredClients().length ? <></> : <ListItem content="Список пуст"></ListItem>}
			</List>
		);
	};

	return (
		<Layout
			title={
				<Title
					rightChildren={
						<Link href="/client/create">
							<FiPlusSquare size={28} />
						</Link>
					}
					title="Клиенты"
				/>
			}
			navBar={<NavBar />}>
			<Paper fixedContent={<SearchBar onInput={value => setSearchQuery(value)} />}>
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
					{clients.isLoading ? <ClientListPlug /> : <ClientList />}
				</Transition>
			</Paper>
		</Layout>
	);
}

export default Clients;
