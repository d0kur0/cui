import { Link } from "solid-app-router";
import { For, createMemo, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
import Layout from "../components/Layout";
import { List, ListItem } from "../components/List";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { PlugText } from "../components/Plugs";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import titleStyles from "../components/Title.module.css";
import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import { clientsStore } from "../stores/clients";

function ClientListPlug() {
	return (
		<List title="Список клиентов" margin="5px 0">
			<For each={Array(9).fill(0)}>
				{_ => (
					<ListItem
						avatar={<Avatar isPlug={true} />}
						title={<PlugText size={80} height={"0.7em"} />}
						content={<PlugText size={160} />}
					/>
				)}
			</For>
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
			<List title={`Список клиентов (${filteredClients().length})`} margin="5px 0">
				<For each={filteredClients()} fallback={<ListItem content="Список пуст"></ListItem>}>
					{({ id, name, avatar, description }) => (
						<ListItem
							href={`/client/${id}`}
							avatar={<Avatar name={name} imageSrc={avatar} />}
							title={name}
							content={description.trim() ? description : "Описание отсутствует"}
						/>
					)}
				</For>
			</List>
		);
	};

	return (
		<Layout
			title={
				<Title
					rightChildren={
						<Link className={titleStyles.navigateLink} href="/client/create">
							Добавить
						</Link>
					}
					title="Клиенты"
				/>
			}
			navBar={<NavBar />}>
			<Paper fixedContent={<SearchBar onInput={value => setSearchQuery(value)} />}>
				<Transition mode="outin" onEnter={transitionOnEnter()} onExit={transitionOnExit()}>
					{clients.isLoading ? <ClientListPlug /> : <ClientList />}
				</Transition>
			</Paper>
		</Layout>
	);
}

export default Clients;
