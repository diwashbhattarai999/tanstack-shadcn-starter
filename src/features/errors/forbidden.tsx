import { useNavigate, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export function ForbiddenError() {
	const { t } = useTranslation("error");

	const navigate = useNavigate();
	const { history } = useRouter();

	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				<h1 className="font-bold text-[7rem] leading-tight">
					{t("403.errorCode")}
				</h1>
				<span className="font-medium">{t("403.title")}</span>
				<p className="text-center text-muted-foreground">
					{t("403.description")}
				</p>
				<div className="mt-6 flex gap-4">
					<Button onClick={() => history.go(-1)} variant="outline">
						{t("403.goBack")}
					</Button>
					<Button onClick={() => navigate({ to: "/" })}>
						{t("403.backToHome")}
					</Button>
				</div>
			</div>
		</div>
	);
}
