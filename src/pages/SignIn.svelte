<style>
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script>
import Button from "../components/Button.svelte";
import { useStoreon } from "@storeon/svelte";
import { USER_SIGN_IN } from "../stores/user";

const { dispatch } = useStoreon();
const handleSignIn = () => {
  dispatch(USER_SIGN_IN);
};
</script>

<div class="centered">
  <Button on:click="{handleSignIn}">Войти используя Google</Button>
</div>
