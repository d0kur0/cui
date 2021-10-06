<style src="./Notifications.css"></style>

<script>
import { useStoreon } from "@storeon/svelte";
import { SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE } from "../stores/common";
import { fade } from "svelte/transition";

const { dispatch, errorMessage, successMessage } = useStoreon(
	"errorMessage",
	"successMessage"
);

function handleHideSuccessMessage() {
	dispatch(SET_SUCCESS_MESSAGE, "");
}

function handleHideErrorMessage() {
	dispatch(SET_ERROR_MESSAGE, "");
}
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
