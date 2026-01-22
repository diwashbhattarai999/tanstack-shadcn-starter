import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration for the application.
 */
export default defineConfig(({ mode }) => {
	/**
	 * Load environment variables for the current mode.
	 * Only variables prefixed with `VITE_` are exposed.
	 */
	const env = loadEnv(mode, process.cwd(), "VITE_");

	const DEV_PORT = Number(env.VITE_DEV_PORT) || 5173;
	const PREVIEW_PORT = Number(env.VITE_PREVIEW_PORT) || 4173;
	const HOST = env.VITE_HOST || "localhost";

	return {
		/**
		 * Vite plugins.
		 */
		plugins: [
			// Paraglide integration for inlang localization
			paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
				outputStructure: "message-modules",
				cookieName: "PARAGLIDE_LOCALE",
				strategy: ["localStorage", "cookie", "preferredLanguage", "baseLocale"],
				urlPatterns: [
					{
						pattern: "/:path(.*)?",
						localized: [
							["en", "/:path(.*)?"],
							["ne", "/:path(.*)?"],
						],
					},
				],
			}),

			// TanStack Devtools for debugging
			devtools(),

			// Enables path aliases from tsconfig.json
			viteTsConfigPaths({
				projects: ["./tsconfig.json"],
			}),

			// Tailwind CSS integration
			tailwindcss(),

			// TanStack Start plugin (routing + SSR)
			tanstackStart(),

			// React + React Compiler
			viteReact({
				babel: {
					plugins: ["babel-plugin-react-compiler"],
				},
			}),
		],

		/**
		 * Development server configuration.
		 */
		server: {
			host: HOST,
			port: DEV_PORT,
			strictPort: true,
			// open: true,
		},

		/**
		 * Preview server configuration (production build preview).
		 */
		preview: {
			host: HOST,
			port: PREVIEW_PORT,
			strictPort: true,
		},

		/**
		 * Build configuration.
		 */
		build: {
			sourcemap: mode !== "production",
			target: "esnext",
		},

		/**
		 * Dependency optimization.
		 */
		optimizeDeps: {
			include: ["react", "react-dom"],
		},
	};
});
