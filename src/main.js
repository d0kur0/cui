import { Workbox } from "workbox-window";
import App from "./App.svelte";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/service-worker.js");
  wb.register();
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
 