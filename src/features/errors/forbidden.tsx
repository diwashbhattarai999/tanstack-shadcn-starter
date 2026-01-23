import { useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";

/**
 * Renders a "Forbidden" error screen (HTTP 403).
 *
 * This component is displayed when a user is authenticated
 * but does not have sufficient permissions to access
 * the requested resource.
 */
export function ForbiddenError() {
	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				{/* Error code (403) */}
				<h1 className="font-bold text-[7rem] leading-tight">
					{m["forbidden.errorCode"]()}
				</h1>

				{/* Error title */}
				<span className="font-medium">{m["forbidden.title"]()}</span>

				{/* Error description */}
				<p className="text-center text-muted-foreground">
					{m["forbidden.description"]()}
				</p>

				{/* Navigation actions */}
				<div className="mt-6 flex gap-4">
					<Button onClick={() => history.go(-1)} variant="outline">
						{m["forbidden.goBack"]()}
					</Button>
					<Button onClick={() => navigate({ to: "/" })}>
						{m["forbidden.backToHome"]()}
					</Button>
				</div>
			</div>
		</div>
	);
}
