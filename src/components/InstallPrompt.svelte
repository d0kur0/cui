<style>
.install-prompt {
	position: absolute;
	bottom: 20px;
	z-index: 5;
	left: 50%;
	transform: translate(-50%);
	max-width: 90%;
	width: 450px;
	background-color: #03224a;
	color: #b2c8e5;
	box-shadow: 0 0 3px 1px #d3dfef;
	border-radius: 8px;
	padding: 15px;
}

:global(.install-prompt button:not(.button--outline)) {
	background-color: #014487 !important;
}

.install-message {
	padding-bottom: 10px;
}

@media (min-width: 1024px) {
	.install-prompt {
		left: unset;
		transform: unset;
		right: 20px;
	}
}
</style>

<script>
import { writable } from "svelte/store";

import Button from "../components/Button.svelte";

let deferredPrompt;
const showInstallPrompt = writable(false);

window.addEventListener("beforeinstallprompt", e => {
	e.preventDefault();
	deferredPrompt = e;
	localStorage.hideInstallPrompt || showInstallPrompt.set(true);
});

window.addEventListener("appinstalled", () => {
	showInstallPrompt.set(false);
	deferredPrompt = null;
});

async function onAccept() {
	showInstallPrompt.set(false);
	deferredPrompt.prompt();
	await deferredPrompt.userChoice;
	deferredPrompt = null;
}

function onReject() {
	localStorage.hideInstallPrompt = true;
}
</script>

<div class="install-prompt">
	<div class="install-message">Установить как приложение?</div>
	<div>
		<Button on:click="{onAccept}" small="{true}">Установить</Button>
		<Button on:click="{onReject}" small="{true}" outline="{true}">Скрыть</Button>
	</div>
</div>
