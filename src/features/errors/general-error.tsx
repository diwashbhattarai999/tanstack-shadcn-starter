import { useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
	minimal?: boolean;
};

export function GeneralError({
	className,
	minimal = false,
}: GeneralErrorProps) {
	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className={cn("h-svh w-full", className)}>
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				{!minimal && (
					<h1 className="font-bold text-[7rem] leading-tight">
						{m["internal_server_error.errorCode"]()}
					</h1>
				)}
				<span className="font-medium">
					{m["internal_server_error.title"]()}
				</span>
				<p className="text-center text-muted-foreground">
					{m["internal_server_error.description"]()}
				</p>
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
