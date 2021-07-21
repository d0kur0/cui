import { Workbox } from "workbox-window";
import App from "./App.svelte";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/service-worker.js");

  const showSkipWaitingPrompt = event => {
    const prompt = createUIPrompt({
      onAccept: () => {
        wb.addEventListener("controlling", event => {
          window.location.reload();
        });

        wb.messageSkipWaiting();
      },

      onReject: () => {
        prompt.dismiss();
      },
    });
  };

  wb.addEventListener("waiting", showSkipWaitingPrompt);

  wb.register();
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
