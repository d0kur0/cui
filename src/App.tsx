import { Route, Router, Routes } from "solid-app-router";
import { Match, Switch, onMount } from "solid-js";

import { Client } from "./pages/Client";
import { ClientForm } from "./pages/ClientForm";
import Clients from "./pages/Clients";
import Events from "./pages/Events";
import Guest from "./pages/Guest";
import Services from "./pages/Services";

import { Notifications } from "./components/Notifications";
import SplashScreen from "./components/SplashScreen";

import useHeightUnit from "./hooks/useHeightUnit";

import { clientsStore } from "./stores/clients";
import { servicesStore } from "./stores/services";
import { userStore } from "./stores/user";

function AppForUsers() {
	onMount(() => {
		clientsStore.fetch();
		servicesStore.fetch();
	});

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Events />} />
				<Route path="/clients" element={<Clients />} />
				<Route path="/client/create" element={<ClientForm />} />
				<Route path="/client/edit/:id" element={<ClientForm />} />
				<Route path="/client/:id" element={<Client />} />
				<Route path="/services" element={<Services />} />
			</Routes>
		</Router>
	);
}

function AppForGuests() {
	return <Guest />;
}

function App() {
	onMount(() => {
		useHeightUnit();
	});

	const { user } = userStore;

	return (
		<>
			<SplashScreen />
			<Notifications />

			{user.isTick && (
				<Switch>
					<Match when={user.isAuth}>
						<AppForUsers />
					</Match>
					<Match when={!user.isAuth}>
						<AppForGuests />
					</Match>
				</Switch>
			)}
		</>
	);
}

export default App;
