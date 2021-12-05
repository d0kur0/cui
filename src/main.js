import { Workbox } from "workbox-window";
import App from "./App.svelte";

if (!("serviceWorker" in navigator)) {
	// Show error
}

const wb = new Workbox("/service-worker.js");
wb.register();

const app = new App({
	target: document.body,
	props: { workbox: wb || null },
});

export default app;
