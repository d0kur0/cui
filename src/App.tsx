import { Route, Router, Routes } from "solid-app-router";
import { Match, Switch, onMount } from "solid-js";
import { useRegisterSW } from "virtual:pwa-register/solid";

import { Account } from "./pages/Account";
import { Client } from "./pages/Client";
import { ClientForm } from "./pages/ClientForm";
import { Clients } from "./pages/Clients";
import { Guest } from "./pages/Guest";
import { Record } from "./pages/Record";
import { RecordForm } from "./pages/RecordForm";
import { Records } from "./pages/Records";
import { Service } from "./pages/Service";
import { ServiceForm } from "./pages/ServiceForm";
import { Services } from "./pages/Services";
import { Stats } from "./pages/Stats";

import { Notifications } from "./components/Notifications";
import { SplashScreen } from "./components/SplashScreen";

import { useHeightUnit } from "./hooks/useHeightUnit";

import { useStore } from "./stores";

function AppForUsers() {
	const { fetch: fetchClients } = useStore("clients");
	const { fetch: fetchServices } = useStore("services");
	const { fetchCurrentMonth: fetchRecords } = useStore("records");

	onMount(() => {
		fetchRecords();
		fetchClients();
		fetchServices();
	});

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Records />} />
				<Route path="/record/create" element={<RecordForm />} />
				<Route path="/record/edit/:id" element={<RecordForm />} />
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

export function App() {
	onMount(() => {
		useHeightUnit();
		useRegisterSW();
	});

	const { user } = useStore("user");

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
