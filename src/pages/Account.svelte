<style>
.user {
  padding: 10px 20px;
  display: flex;
}

.user__name {
  font-weight: bolder;
}

.user__info {
  margin-left: 15px;
}

.user__exit-button {
  border: none;
  color: var(--ancent-color);
  padding: 0;
  margin: 0;
  background-color: transparent;
  cursor: pointer;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import { USER_SIGN_OUT } from "../stores/user";
import Avatar from "../components/Avatar.svelte";
import Title from "../components/Title.svelte";

const { user, dispatch } = useStoreon("user");
const handleExit = () => {
  dispatch(USER_SIGN_OUT);
};
</script>

<Title title="Аккаунт" />
<div class="user">
  <div class="user__avatar"><Avatar src="{$user.picture}" /></div>
  <div class="user__info">
    <div class="user__name">{$user.name}</div>
    <div class="user__exit">
      <button on:click="{handleExit}" class="user__exit-button">Выйти</button>
    </div>
  </div>
</div>
