import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";

/**
 * Renders a "Service Unavailable / Maintenance" error screen (HTTP 503).
 *
 * This component should be displayed when the application
 * or backend services are temporarily unavailable due to
 * maintenance or downtime.
 */
export function MaintenanceError() {
	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				{/* Error code (e.g. 503) */}
				<h1 className="font-bold text-[7rem] leading-tight">
					{m["service_unavailable.errorCode"]()}
				</h1>

				{/* Error title */}
				<span className="font-medium">{m["service_unavailable.title"]()}</span>

				{/* Error description */}
				<p className="text-center text-muted-foreground">
					{m["service_unavailable.description"]()}
				</p>

				{/* Optional action */}
				<div className="mt-6 flex gap-4">
					<Button variant="outline">
						{m["service_unavailable.learnMore"]()}
					</Button>
				</div>
			</div>
		</div>
	);
}
