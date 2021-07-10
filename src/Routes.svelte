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

const { user, dispatch } = useStoreon("user");

auth.onAuthStateChanged(state => {
  const isSignedIn = Boolean(state);
  dispatch(USER_SET_IS_SIGNED, isSignedIn);

  if ($location === "/signIn" && isSignedIn) push("/");
  if ($location !== "/signIn" && !isSignedIn) push("/signIn");

  if (!isSignedIn) return dispatch(USER_CLEAR_DATA);
  const { displayName, email, uid, photoURL } = state;
  dispatch(USER_SET_DATA, { name: displayName, email, id: uid, picture: photoURL });
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
  "/": signedInWrapper(Records),

  // Clients
  "/clients": signedInWrapper(Clients),
  "/clients/create": signedInWrapper(ClientCreate),
  "/clients/:id": signedInWrapper(ClientView),

  // Services
  "/services": signedInWrapper(Services),
  "/services/create": signedInWrapper(ServiceCreate),
  "/services/:id": signedInWrapper(ServiceView),

  "/account": signedInWrapper(Account),
  "/signIn": SignIn,

  // Catch-all route last
  // "*": NotFound,
};
</script>

<PageContainer title="Авторизация" hideTabBar="{false}">
  <Router routes="{routes}" />
</PageContainer>
