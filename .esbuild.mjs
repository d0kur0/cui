import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import { create } from "browser-sync";
import { generateSW } from "workbox-build";

const isProduction = process.env.NODE_ENV === "production";
const [command] = process.argv.slice(2);

function generateServiceWorker() {
	return generateSW({
		swDest: "./public/service-worker.js",
		globDirectory: "./public/",
		globPatterns: [
			"**/**.js",
			"**/**.css",
			"**/**.eot",
			"**/**.ttf",
			"**/**.woff",
			"**/**.woff2",
			"index.html",
			"favicon.png",
		],
	});
}

let buildOptions = {
	target: "esnext",
	bundle: true,
	format: "iife",
	platform: "browser",
	minify: true,
	sourcemap: !isProduction,
	entryPoints: ["./src/main.js"],
	outfile: "./public/build/bundle.js",
	plugins: [
		esbuildSvelte({
			preprocess: sveltePreprocess(),
		}),
	],
	logLevel: "info",
	define: {
		"process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
	},
};

if (command === "serve") {
	const browserSync = create();
	browserSync.init({
		ui: false,
		watch: false,
		server: "./public",
		files: "./public/**/**",
	});

	buildOptions = {
		...buildOptions,
		watch: {
			onRebuild(error) {
				if (error) console.error("Error on watch: ", error);
				generateServiceWorker().then(() => browserSync.reload());
			},
		},
	};
}

esbuild
	.build(buildOptions)
	.then(() => generateServiceWorker())
	.catch(() => process.exit(1));
