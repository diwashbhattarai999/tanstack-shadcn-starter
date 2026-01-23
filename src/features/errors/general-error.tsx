import { useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

/**
 * Props for {@link GeneralError}.
 *
 * Extends standard HTML div attributes to allow layout
 * customization via `className` and other native props.
 */
type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
	/**
	 * When true, renders a minimal version of the error UI.
	 *
	 * Minimal mode:
	 * - Hides the error code (e.g. 500)
	 * - Hides navigation actions (Go Back / Home)
	 *
	 * Useful for:
	 * - Inline error states
	 * - Error boundaries inside layouts
	 * - Embedded error components where navigation is handled elsewhere
	 *
	 * @default false
	 */
	minimal?: boolean;
};

/**
 * General-purpose internal server error component (HTTP 500).
 *
 * This component serves as a reusable fallback UI for unexpected
 * application errors that do not map to a specific error type
 * (e.g. Not Found, Unauthorized, Maintenance).
 */
export function GeneralError({
	className,
	minimal = false,
}: GeneralErrorProps) {
	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className={cn("h-svh w-full", className)}>
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				{/* Error code (hidden in minimal mode) */}
				{!minimal && (
					<h1 className="font-bold text-[7rem] leading-tight">
						{m["internal_server_error.errorCode"]()}
					</h1>
				)}

				{/* Error title */}
				<span className="font-medium">
					{m["internal_server_error.title"]()}
				</span>

				{/* Error description */}
				<p className="text-center text-muted-foreground">
					{m["internal_server_error.description"]()}
				</p>

				{/* Navigation actions (hidden in minimal mode) */}
				{!minimal && (
					<div className="mt-6 flex gap-4">
						<Button onClick={() => history.go(-1)} variant="outline">
							{m["internal_server_error.goBack"]()}
						</Button>
						<Button onClick={() => navigate({ to: "/" })}>
							{m["internal_server_error.backToHome"]()}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
