import adapterAuto from "@sveltejs/adapter-auto";
import cloudflareWorkersAdapter from "@sveltejs/adapter-cloudflare-workers";
import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

function getAdapter() {
    console.log("process.env.VITE_ADAPTER", process.env.VITE_ADAPTER);
    switch (process.env.VITE_ADAPTER) {
        case "capacitor":
            return staticAdapter({
                strict: false,
                pages: "build/capacitor",
                assets: "build/capacitor",
                fallback: "index.html",
            });

        case "cloudflare-workers":
            return cloudflareWorkersAdapter();

        default:
            return adapterAuto();
    }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess()],
    kit: {
        adapter: getAdapter(),

        paths: {
            base: "/paraglide-sveltekit/example",
        },
    },

    extensions: [".svelte", ".svx"],
};

export default config;
