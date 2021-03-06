import { Link } from "solid-app-router";
import { For, createMemo, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { List, ListItem } from "../components/List";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { PlugText } from "../components/Plugs";
import { SearchBar } from "../components/SearchBar";
import { Title } from "../components/Title";
import titleStyles from "../components/modules/Title.module.css";

import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import { useStore } from "../stores";

function ClientListPlug() {
	return (
		<List title="Список клиентов" margin="5px 0">
			<For each={Array(9).fill(0)}>
				{_ => (
					<ListItem
						avatar={<Avatar isPlug={true} />}
						title={<PlugText width={80} height={"0.7em"} />}
						content={<PlugText width={160} />}
					/>
				)}
			</For>
		</List>
	);
}

export function Clients() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const { clients } = useStore("clients");

	const filteredClients = createMemo(() => {
		const _clients = clients.list.filter(client => !client.deletedAt);

		if (!searchQuery()) return _clients;

		return _clients.filter(
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
						<Link class={titleStyles.navigateLink} href="/client/create">
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
