<style>
.user {
}

.user__name {
}

.user__avatar {
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import Avatar from "../components/Avatar.svelte";

import PageContainer from "../components/PageContainer.svelte";
const { user } = useStoreon("user");
</script>

<PageContainer title="Аккаунт">
  <div class="user">
    <div class="user__avatar"><Avatar initials="{$user.name}" /></div>
    <div class="user__name">{$user.name}</div>
  </div>
</PageContainer>
