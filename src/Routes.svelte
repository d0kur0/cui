<script>
import Records from "./pages/Records.svelte";
import Clients from "./pages/Clients.svelte";
import ClientCreate from "./pages/ClientCreate.svelte";
import SignIn from "./pages/SignIn.svelte";
import wrap from "svelte-spa-router/wrap";
import { location, push } from "svelte-spa-router";
import { auth } from "./firebase";
import { useStoreon } from "@storeon/svelte";
import { USER_CLEAR_DATA, USER_SET_DATA, USER_SET_IS_SIGNED } from "./stores/user";
import Router from "svelte-spa-router";
import ClientView from "./pages/ClientView.svelte";
import Services from "./pages/Services.svelte";
import ServiceCreate from "./pages/ServiceCreate.svelte";
import ServiceView from "./pages/ServiceView.svelte";
import Account from "./pages/Account.svelte";
import PageContainer from "./components/PageContainer.svelte";
import Statistic from "./pages/Statistic.svelte";
import RecordCreate from "./pages/RecordCreate.svelte";
import RecordView from "./pages/RecordView.svelte";
import { CLIENTS_FETCH } from "./stores/clients";
import { SERVICES_FETCH } from "./stores/services";
import { RECORDS_FETCH } from "./stores/records";
import Loading from "./components/Loading.svelte";
import { STATISTIC_CALC_MONTH_DAYS_COUNT } from "./stores/statistic";

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
  "/records": signedInWrapper(Records),
  "/records/create": signedInWrapper(RecordCreate),
  "/records/:id": signedInWrapper(RecordView),

  // Clients
  "/clients": signedInWrapper(Clients),
  "/clients/create": signedInWrapper(ClientCreate),
  "/clients/:id": signedInWrapper(ClientView),

  // Services
  "/services": signedInWrapper(Services),
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
