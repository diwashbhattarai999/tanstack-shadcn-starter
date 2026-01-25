import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fonts } from "@/configs/fonts";
import { useFont } from "@/contexts/font-provider";
import { useTheme } from "@/contexts/theme-provider";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { cn } from "@/lib/utils";

const appearanceFormSchema = z.object({
	theme: z.enum(["light", "dark"]),
	font: z.enum(fonts),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
	const { font, setFont } = useFont();
	const { appTheme, setTheme } = useTheme();

	// This can come from your database or API.
	const defaultValues: Partial<AppearanceFormValues> = {
		theme: appTheme,
		font,
	};

	const form = useForm<AppearanceFormValues>({
		resolver: zodResolver(appearanceFormSchema),
		defaultValues,
	});

	function onSubmit(data: AppearanceFormValues) {
		if (data.font !== font) setFont(data.font);
		if (data.theme !== appTheme) setTheme(data.theme);

		showSubmittedData(data);
	}

	return (
		<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
			<Field data-invalid={!!form.formState.errors.font}>
				<FieldLabel htmlFor="font">Font</FieldLabel>
				<div className="relative w-max">
					<select
						className={cn(
							buttonVariants({ variant: "outline" }),
							"w-50 appearance-none font-normal capitalize",
							"dark:bg-background dark:hover:bg-background"
						)}
						id="font"
						{...form.register("font")}
					>
						{fonts.map((font) => (
							<option key={font} value={font}>
								{font}
							</option>
						))}
					</select>
					<ChevronDown className="absolute end-3 top-2.5 h-4 w-4 opacity-50" />
				</div>
				<FieldDescription className="font-manrope">
					Set the font you want to use in the dashboard.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.font]} />
			</Field>

			<Field data-invalid={!!form.formState.errors.theme}>
				<FieldLabel>Theme</FieldLabel>
				<FieldDescription>Select the theme for the dashboard.</FieldDescription>
				<FieldError errors={[form.formState.errors.theme]} />
				<RadioGroup
					className="grid max-w-md grid-cols-2 gap-8 pt-2"
					defaultValue={form.getValues("theme")}
					onValueChange={(value) =>
						form.setValue("theme", value as "light" | "dark")
					}
				>
					<Field>
						<FieldLabel
							className="[&:has([data-state=checked])>div]:border-primary"
							htmlFor="theme-light"
						>
							<RadioGroupItem
								className="sr-only"
								id="theme-light"
								value="light"
							/>
							<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
								<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
									<div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
										<div className="h-2 w-20 rounded-lg bg-[#ecedef]" />
										<div className="h-2 w-25 rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-25 rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-25 rounded-lg bg-[#ecedef]" />
									</div>
								</div>
							</div>
							<span className="block w-full p-2 text-center font-normal">
								Light
							</span>
						</FieldLabel>
					</Field>
					<Field>
						<FieldLabel
							className="[&:has([data-state=checked])>div]:border-primary"
							htmlFor="theme-dark"
						>
							<RadioGroupItem
								className="sr-only"
								id="theme-dark"
								value="dark"
							/>
							<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
								<div className="space-y-2 rounded-sm bg-slate-950 p-2">
									<div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
										<div className="h-2 w-20 rounded-lg bg-slate-400" />
										<div className="h-2 w-25 rounded-lg bg-slate-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
										<div className="h-4 w-4 rounded-full bg-slate-400" />
										<div className="h-2 w-25 rounded-lg bg-slate-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
										<div className="h-4 w-4 rounded-full bg-slate-400" />
										<div className="h-2 w-25 rounded-lg bg-slate-400" />
									</div>
								</div>
							</div>
							<span className="block w-full p-2 text-center font-normal">
								Dark
							</span>
						</FieldLabel>
					</Field>
				</RadioGroup>
			</Field>

			<Button type="submit">Update preferences</Button>
		</form>
	);
}
