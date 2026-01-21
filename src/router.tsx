import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import {
	getQueryClient,
	TanstackQueryProvider,
} from "@/integrations/tanstack-query/root-provider";

import { ThemeProvider } from "./components/providers/theme-providers";
import { STORAGE_KEYS } from "./configs/storage";
import { DEFAULT_THEME } from "./configs/theme";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = getQueryClient();

	const router = createRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: "intent",
		scrollRestoration: true,
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<TanstackQueryProvider {...rqContext}>
					<ThemeProvider
						defaultTheme={DEFAULT_THEME}
						storageKey={STORAGE_KEYS.THEME}
					>
						{props.children}
					</ThemeProvider>
				</TanstackQueryProvider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
