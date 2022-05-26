import { Match, onMount, Switch } from "solid-js";
import { Router, Routes, Route } from "solid-app-router";
import Events from "./pages/Events";
import useHeightUnit from "./hooks/useHeightUnit";
import Guest from "./pages/Guest";
import SplashScreen from "./components/SplashScreen";
import Clients from "./pages/Clients";
import { userStore } from "./stores/user";
import { Client } from "./pages/Client";
import { clientsStore } from "./stores/clients";
import { ClientForm } from "./pages/ClientForm";
import { Notifications } from "./components/Notifications";

function AppForUsers() {
	clientsStore.fetchAll();

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Events />} />
				<Route path="/clients" element={<Clients />} />
				<Route path="/client/create" element={<ClientForm />} />
				<Route path="/client/edit/:id" element={<ClientForm />} />
				<Route path="/client/:id" element={<Client />} />
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
