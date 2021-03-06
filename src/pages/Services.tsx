import { Link } from "solid-app-router";
import { HiSolidHashtag } from "solid-icons/hi";
import { For, createMemo, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import { Layout } from "../components/Layout";
import { List, ListItem, ListItemBetweenContent } from "../components/List";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { PlugText } from "../components/Plugs";
import { SearchBar } from "../components/SearchBar";
import { Title } from "../components/Title";
import titleStyles from "../components/modules/Title.module.css";

import { transitionOnEnter, transitionOnExit } from "../helpers/transition";
import { useStore } from "../stores";

function ServicesListPlug() {
	function EachItem() {
		return (
			<ListItem
				content={
					<ListItemBetweenContent
						leftContent={
							<>
								<HiSolidHashtag /> <PlugText width={200} />
							</>
						}
						rightContent={<PlugText width={30} />}
					/>
				}
			/>
		);
	}

	return (
		<List title="Список услуг" margin="5px 0">
			<For each={Array(15).fill(0)}>{_ => <EachItem />}</For>
		</List>
	);
}

export function Services() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const { services } = useStore("services");

	const filteredServices = createMemo(() => {
		const _services = services.list.filter(({ deletedAt }) => !deletedAt);

		if (!searchQuery()) return _services;

		return _services.filter(service => service.name.toLowerCase().includes(searchQuery().toLowerCase()));
	});

	const ServiceList = () => {
		return (
			<List title="Список услуг" margin="5px 0">
				<For each={filteredServices()} fallback={<ListItem content="Список пуст"></ListItem>}>
					{({ id, name, price }) => (
						<ListItem
							href={`/service/${id}`}
							content={
								<ListItemBetweenContent
									leftContent={
										<>
											<HiSolidHashtag /> {name}
										</>
									}
									rightContent={`${price} руб.`}
								/>
							}
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
						<Link class={titleStyles.navigateLink} href="/service/create">
							Добавить
						</Link>
					}
					title="Услуги"
				/>
			}
			navBar={<NavBar />}>
			<Paper fixedContent={<SearchBar onInput={value => setSearchQuery(value)} />}>
				<Transition mode="outin" onEnter={transitionOnEnter()} onExit={transitionOnExit()}>
					{services.isLoading ? <ServicesListPlug /> : <ServiceList />}
				</Transition>
			</Paper>
		</Layout>
	);
}
