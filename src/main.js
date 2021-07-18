import { Workbox } from "workbox-window";
import App from "./App.svelte";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/build/service-worker.js");
  process.env.NODE_ENV === "production" && wb.register();
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
