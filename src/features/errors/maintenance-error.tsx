import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";

export function MaintenanceError() {
	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				<h1 className="font-bold text-[7rem] leading-tight">
					{m["service_unavailable.errorCode"]()}
				</h1>
				<span className="font-medium">{m["service_unavailable.title"]()}</span>
				<p className="text-center text-muted-foreground">
					{m["service_unavailable.description"]()}
				</p>
				<div className="mt-6 flex gap-4">
					<Button variant="outline">
						{m["service_unavailable.learnMore"]()}
					</Button>
				</div>
			</div>
		</div>
	);
}
