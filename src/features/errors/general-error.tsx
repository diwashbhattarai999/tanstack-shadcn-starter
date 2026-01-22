import { useNavigate, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
	minimal?: boolean;
};

export function GeneralError({
	className,
	minimal = false,
}: GeneralErrorProps) {
	const { t } = useTranslation("error");

	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className={cn("h-svh w-full", className)}>
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				{!minimal && (
					<h1 className="font-bold text-[7rem] leading-tight">
						{t("500.errorCode")}
					</h1>
				)}
				<span className="font-medium">{t("500.title")}</span>
				<p className="text-center text-muted-foreground">
					{t("500.description")}
				</p>
				{!minimal && (
					<div className="mt-6 flex gap-4">
						<Button onClick={() => history.go(-1)} variant="outline">
							{t("500.goBack")}
						</Button>
						<Button onClick={() => navigate({ to: "/" })}>
							{t("500.backToHome")}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
