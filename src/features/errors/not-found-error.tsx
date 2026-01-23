import { useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";

/**
 * Renders a standardized "Not Found / 404" error screen.
 *
 * This component is intended to be displayed when a user navigates
 * to a route that does not exist within the application.
 */
export function NotFoundError() {
	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				{/* Error code (e.g. 404) */}
				<h1 className="font-bold text-[7rem] leading-tight">
					{m["not_found.errorCode"]()}
				</h1>

				{/* Error title */}
				<span className="font-medium">{m["not_found.title"]()}</span>

				{/* Error description */}
				<p className="text-center text-muted-foreground">
					{m["not_found.description"]()}
				</p>

				{/* Action buttons */}
				<div className="mt-6 flex gap-4">
					<Button onClick={() => history.go(-1)} variant="outline">
						{m["not_found.goBack"]()}
					</Button>

					<Button onClick={() => navigate({ to: "/" })}>
						{m["not_found.backToHome"]()}
					</Button>
				</div>
			</div>
		</div>
	);
}
