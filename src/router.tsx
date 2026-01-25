import { type AnyRouter, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import {
	getQueryClient,
	TanstackQueryProvider,
} from "@/components/providers/tanstack-query-provider";
import { NotFoundError } from "@/features/errors/not-found-error";

import { GeneralError } from "./features/errors/general-error.js";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime.js";
import { routeTree } from "./routeTree.gen";

/**
 * Creates and configures the TanStack Router instance for the application.
 * This function must be called once during application bootstrap.
 *
 * @returns {AnyRouter}
 * The fully configured TanStack Router instance.
 */
export const getRouter = (): AnyRouter => {
	/**
	 * Create the router instance with an initially undefined context.
	 * The context is populated immediately after creation via `router.update`.
	 */
	const router = createRouter({
		routeTree,

		/**
		 * Router context is intentionally set to `undefined` here.
		 * It is populated after the QueryClient is created to avoid circular dependencies.
		 */
		// biome-ignore lint/style/noNonNullAssertion: Context is set immediately after initialization
		context: undefined!,

		/**
		 * Preload routes on user intent (hover/focus) for better UX.
		 */
		defaultPreload: "intent",

		/**
		 * Disable stale time for preloaded routes to always fetch fresh data.
		 */
		defaultPreloadStaleTime: 0,

		/**
		 * Enable structural sharing to optimize re-renders.
		 */
		defaultStructuralSharing: true,

		/**
		 * Enables scroll position restoration on navigation.
		 */
		scrollRestoration: true,

		/**
		 * Wraps the entire application with global providers.
		 */
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<TanstackQueryProvider {...rqContext}>
					{props.children}
				</TanstackQueryProvider>
			);
		},

		/**
		 * Global fallback component rendered when no route matches.
		 */
		defaultNotFoundComponent: () => <NotFoundError />,

		/**
		 * Global fallback component for unhandled errors.
		 */
		defaultErrorComponent: () => <GeneralError />,

		/**
		 * URL localization handlers to manage locale prefixes.
		 */
		rewrite: {
			input: ({ url }) => deLocalizeUrl(url),
			output: ({ url }) => localizeUrl(url),
		},
	});

	/**
	 * Initialize the React Query client using the router instance.
	 * The router is passed to allow navigation in response to query errors
	 * (e.g. 401, 500).
	 */
	const rqContext = getQueryClient(router);

	/**
	 * Update the router context with the initialized QueryClient.
	 * This makes the QueryClient available in all route loaders and actions.
	 */
	router.update({
		context: { ...rqContext },
	});

	/**
	 * Integrate TanStack Router with React Query for SSR.
	 * Ensures proper query dehydration/hydration during server rendering.
	 */
	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
