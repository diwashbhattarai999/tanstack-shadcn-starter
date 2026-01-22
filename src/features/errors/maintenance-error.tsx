import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export function MaintenanceError() {
	const { t } = useTranslation("error");

	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				<h1 className="font-bold text-[7rem] leading-tight">
					{t("503.errorCode")}
				</h1>
				<span className="font-medium">{t("503.title")}</span>
				<p className="text-center text-muted-foreground">
					{t("503.description")}
				</p>
				<div className="mt-6 flex gap-4">
					<Button variant="outline">{t("503.learnMore")}</Button>
				</div>
			</div>
		</div>
	);
}
