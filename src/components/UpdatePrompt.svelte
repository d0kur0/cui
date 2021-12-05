<style>
.update-prompt {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: calc(var(--vh) * 100);
	z-index: 10;
	background-color: rgba(110, 110, 110, 0.568);
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(5px);
}

.prompt {
	padding: 15px;
	background-color: #fff;
	border-radius: 8px;
	max-width: 90%;
	width: 450px;
}

.prompt-buttons {
	margin-top: 10px;
}
</style>

<script>
import { writable } from "svelte/store";
import Button from "../components/Button.svelte";

export let workbox;

const showUpdatePrompt = writable(false);

function showSkipWaitingPrompt() {
	sessionStorage.hideUpdatePrompt !== undefined && showUpdatePrompt.set(true);
}

function onAccept() {
	workbox.addEventListener("controlling", () => {
		window.location.reload();
	});

	workbox.messageSkipWaiting();
}

function onReject() {
	showUpdatePrompt.set(false);
	sessionStorage.hideUpdatePrompt = true;
}

workbox.addEventListener("waiting", showSkipWaitingPrompt);
</script>

{#if $showUpdatePrompt}
	<div class="update-prompt">
		<div class="prompt">
			<div>Доступно обновлените, обновить сейчас?</div>
			<div class="prompt-buttons">
				<Button on:click="{onAccept}" small="{true}">Обновить</Button>
				<Button on:click="{onReject}" small="{true}" outline="{true}">Не сейчас</Button>
			</div>
		</div>
	</div>
{/if}
