import { useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";

export function UnauthorisedError() {
	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				<h1 className="font-bold text-[7rem] leading-tight">
					{m["unauthorized.errorCode"]()}
				</h1>
				<span className="font-medium">{m["unauthorized.title"]()}</span>
				<p className="text-center text-muted-foreground">
					{m["unauthorized.description"]()}
				</p>
				<div className="mt-6 flex gap-4">
					<Button onClick={() => history.go(-1)} variant="outline">
						{m["unauthorized.goBack"]()}
					</Button>
					<Button onClick={() => navigate({ to: "/" })}>
						{m["unauthorized.backToHome"]()}
					</Button>
				</div>
			</div>
		</div>
	);
}
