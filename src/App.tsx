import { Route, Router, Routes } from "solid-app-router";
import { Match, Switch, onMount } from "solid-js";

import Account from "./pages/Account";
import { Client } from "./pages/Client";
import { ClientForm } from "./pages/ClientForm";
import Clients from "./pages/Clients";
import Guest from "./pages/Guest";
import Record from "./pages/Record";
import RecordForm from "./pages/RecordForm";
import Records from "./pages/Records";
import Service from "./pages/Service";
import ServiceForm from "./pages/ServiceForm";
import Services from "./pages/Services";
import Stats from "./pages/Stats";

import { Notifications } from "./components/Notifications";
import SplashScreen from "./components/SplashScreen";

import useHeightUnit from "./hooks/useHeightUnit";

import { clientsStore } from "./stores/clients";
import { recordsStore } from "./stores/records";
import { servicesStore } from "./stores/services";
import { userStore } from "./stores/user";

function AppForUsers() {
	onMount(() => {
		clientsStore.fetch();
		servicesStore.fetch();
		recordsStore.fetchCurrentMonth();
	});

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Records />} />
				<Route path="/record/create" element={<RecordForm />} />
				<Route path="/record/:id" element={<Record />} />
				<Route path="/me" element={<Account />} />
				<Route path="/stats" element={<Stats />} />
				<Route path="/clients" element={<Clients />} />
				<Route path="/client/create" element={<ClientForm />} />
				<Route path="/client/edit/:id" element={<ClientForm />} />
				<Route path="/client/:id" element={<Client />} />
				<Route path="/service/create" element={<ServiceForm />} />
				<Route path="/service/edit/:id" element={<ServiceForm />} />
				<Route path="/service/:id" element={<Service />} />
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
