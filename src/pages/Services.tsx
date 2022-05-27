import { Link } from "solid-app-router";
import { FiPlusSquare } from "solid-icons/fi";
import { createMemo, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import Layout from "../components/Layout";
import { List, ListItem } from "../components/List";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { PlugText } from "../components/Plugs";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import { servicesStore } from "../stores/services";

function ServicesListPlug() {
	return (
		<List title="Список услуг" margin="5px 0">
			{Array(9)
				.fill(0)
				.map(() => (
					<ListItem title={<PlugText size={80} height={"0.7em"} />} content={<PlugText size={160} />} />
				))}
		</List>
	);
}

function Services() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const { services } = servicesStore;

	const filteredServices = createMemo(() => {
		if (!searchQuery()) return services.list;
		return services.list.filter(service => service.name.toLowerCase().includes(searchQuery().toLowerCase()));
	});

	const ServiceList = () => {
		return (
			<List title="Список услуг" margin="5px 0">
				{filteredServices().map(service => (
					<ListItem href={`/service/${service.id}`} title={service.name} content={`${service.price} руб.`} />
				))}

				{filteredServices().length ? <></> : <ListItem content="Список пуст"></ListItem>}
			</List>
		);
	};

	return (
		<Layout
			title={
				<Title
					rightChildren={
						<Link href="/service/create">
							<FiPlusSquare size={28} />
						</Link>
					}
					title="Услуги"
				/>
			}
			navBar={<NavBar />}
		>
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
					}}
				>
					{services.isLoading ? <ServicesListPlug /> : <ServiceList />}
				</Transition>
			</Paper>
		</Layout>
	);
}

export default Services;
