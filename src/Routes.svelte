<script>
import { auth } from "./firebase";
import { useStoreon } from "@storeon/svelte";
import { CLIENTS_FETCH } from "./stores/clients";
import { RECORDS_FETCH } from "./stores/records";
import { SERVICES_FETCH } from "./stores/services";
import { location, push } from "svelte-spa-router";
import { STATISTIC_CALC_MONTH_DAYS_COUNT } from "./stores/statistic";
import { USER_CLEAR_DATA, USER_SET_DATA, USER_SET_IS_SIGNED } from "./stores/user";

import wrap from "svelte-spa-router/wrap";
import Router from "svelte-spa-router";
import Loading from "./components/Loading.svelte";
import PageContainer from "./components/PageContainer.svelte";

import ClientList from "./pages/client/List.svelte";
import ClientView from "./pages/client/View.svelte";
import ClientCreate from "./pages/client/Create.svelte";

import ServiceList from "./pages/service/List.svelte";
import ServiceView from "./pages/service/View.svelte";
import ServiceCreate from "./pages/service/Create.svelte";

import RecordList from "./pages/record/List.svelte";
import RecordView from "./pages/record/View.svelte";
import RecordCreate from "./pages/record/Create.svelte";

import SignIn from "./pages/SignIn.svelte";
import Account from "./pages/Account.svelte";
import Statistic from "./pages/Statistic.svelte";

const { user, dispatch } = useStoreon("user");

let isTick = false;

$: if ($user.isSignedIn) {
	dispatch(CLIENTS_FETCH);
	dispatch(SERVICES_FETCH);
	dispatch(RECORDS_FETCH);
	dispatch(STATISTIC_CALC_MONTH_DAYS_COUNT);
}

auth.onAuthStateChanged(state => {
	const isSignedIn = Boolean(state);

	if ($location === "/signIn" && isSignedIn) push("/");
	if ($location !== "/signIn" && !isSignedIn) push("/signIn");

	if (state) {
		const { displayName, email, uid, photoURL } = state;
		dispatch(USER_SET_DATA, { name: displayName, email, id: uid, picture: photoURL });
	}

	dispatch(USER_SET_IS_SIGNED, isSignedIn);
	isSignedIn || dispatch(USER_CLEAR_DATA);

	isTick = true;
});

const signedInWrapper = component =>
	wrap({
		component,
		conditions: [
			() => {
				$user.isSignedIn || push("/signIn");
				return $user.isSignedIn;
			},
		],
	});

const routes = {
	"/": wrap({ component: async () => {}, conditions: [() => push("/records")] }),
	"/records": signedInWrapper(RecordList),
	"/records/create": signedInWrapper(RecordCreate),
	"/records/:id": signedInWrapper(RecordView),

	"/clients": signedInWrapper(ClientList),
	"/clients/create": signedInWrapper(ClientCreate),
	"/clients/:id": signedInWrapper(ClientView),

	"/services": signedInWrapper(ServiceList),
	"/services/create": signedInWrapper(ServiceCreate),
	"/services/:id": signedInWrapper(ServiceView),

	"/account": signedInWrapper(Account),
	"/statistic": signedInWrapper(Statistic),
	"/signIn": SignIn,

	// Catch-all route last
	// "*": NotFound,
};
</script>

<PageContainer hideTabBar="{!$user.isSignedIn}">
	{#if isTick}
		<Router restoreScrollState="{true}" routes="{routes}" />
	{:else}
		<Loading />
	{/if}
</PageContainer>
