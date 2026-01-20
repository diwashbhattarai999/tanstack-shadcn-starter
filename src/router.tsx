import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import {
	getQueryClient,
	TanstackQueryProvider,
} from "@/integrations/tanstack-query/root-provider";

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
					{props.children}
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
