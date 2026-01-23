import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { APP_CONFIG } from "@/configs/app";
import { ThemeProvider } from "@/contexts/theme-providers";
import { env } from "@/env";
import appCss from "@/styles/base.css?url";

import { getLocale } from "../paraglide/runtime.js";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		// -----------------------
		// META TAGS
		// -----------------------
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
			{ name: "theme-color", content: APP_CONFIG.themeColor },

			// Primary Meta
			{ title: APP_CONFIG.name },
			{ name: "title", content: APP_CONFIG.name },
			{ name: "description", content: APP_CONFIG.description },

			// Open Graph
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: APP_CONFIG.url },
			{ property: "og:title", content: APP_CONFIG.name },
			{ property: "og:description", content: APP_CONFIG.description },
			{ property: "og:image", content: APP_CONFIG.seoImage },

			// Twitter
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:url", content: APP_CONFIG.url },
			{ name: "twitter:title", content: APP_CONFIG.name },
			{ name: "twitter:description", content: APP_CONFIG.description },
			{ name: "twitter:image", content: APP_CONFIG.seoImage },
		],

		// -----------------------
		// LINK TAGS
		// -----------------------
		links: [
			// App styles
			{
				rel: "stylesheet",
				href: appCss,
			},

			// Favicons
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: APP_CONFIG.icons.appleTouch,
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: APP_CONFIG.icons.favicon32,
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: APP_CONFIG.icons.favicon16,
			},
			{ rel: "icon", href: APP_CONFIG.icons.faviconIco },
			{ rel: "manifest", href: APP_CONFIG.manifest },

			// Fonts - optimized for performance
			{
				rel: "dns-prefetch",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "dns-prefetch",
				href: "https://fonts.gstatic.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href:
					"https://fonts.googleapis.com/css2?" +
					"family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900" +
					"&family=Manrope:wght@200..800&display=swap",
				as: "style",
			},
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css2?" +
					"family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900" +
					"&family=Manrope:wght@200..800&display=swap",
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang={getLocale()}>
			<head>
				<HeadContent />
			</head>
			<body>
				{/* Context Providers */}
				<ThemeProvider>
					{/*  Main app content */}
					{children}
				</ThemeProvider>

				{/* Devtools - only in development mode */}
				{env.VITE_ENABLE_DEVTOOLS && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							{
								name: "Tanstack Query",
								render: <ReactQueryDevtoolsPanel />,
							},
						]}
					/>
				)}

				{/* Scripts */}
				<Scripts />
			</body>
		</html>
	);
}
