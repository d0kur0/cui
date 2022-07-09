import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [
		solidPlugin(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			devOptions: {
				enabled: true,
			},
			includeAssets: ["fonts/**/**", "logo512.png", "logo192.png", "favicon.png"],
			manifest: {
				name: "CUI12",
				short_name: "CUI",
				description: "Records manager",
				theme_color: "#ffedfb",
				icons: [
					{
						src: "/logo192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/logo512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	build: {
		target: "esnext",
		polyfillDynamicImport: false,
	},
});
