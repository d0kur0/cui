<style>
.notifications {
  position: absolute;
  bottom: calc(var(--tabbar-height) + 20px);
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  text-align: center;
  border-radius: 5px;
  padding: 7px;
  color: #404040;
  background-color: #eaeaea;
  border: none;
  transition: 0.3s;
}

.message:hover {
  opacity: 0.8;
}

.success-message {
  color: #498642;
  background-color: #9aff9a;
}

.error-message {
  color: #bd4545;
  background-color: #ffc7c7;
}
</style>

<script>
import { useStoreon } from "@storeon/svelte";
import { SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE } from "../stores/common";
import { fade } from "svelte/transition";

const { dispatch, errorMessage, successMessage } = useStoreon(
  "errorMessage",
  "successMessage"
);

const handleHideSuccessMessage = () => {
  dispatch(SET_SUCCESS_MESSAGE, "");
};

const handleHideErrorMessage = () => {
  dispatch(SET_ERROR_MESSAGE, "");
};
</script>

<div class="notifications">
  {#if $successMessage}
    <button
      transition:fade
      on:click="{handleHideSuccessMessage}"
      class="message success-message">
      {$successMessage}
    </button>
  {/if}

  {#if $errorMessage}
    <button
      transition:fade
      on:click="{handleHideErrorMessage}"
      class="message error-message">
      {$errorMessage}
    </button>
  {/if}
</div>
