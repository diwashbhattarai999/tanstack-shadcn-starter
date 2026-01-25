import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { cn } from "@/lib/utils";

const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Chinese", value: "zh" },
] as const;

const accountFormSchema = z.object({
	name: z
		.string()
		.min(1, "Please enter your name.")
		.min(2, "Name must be at least 2 characters.")
		.max(30, "Name must not be longer than 30 characters."),
	dob: z.date("Please select your date of birth."),
	language: z.string("Please select a language."),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
	name: "",
};

export function AccountForm() {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	});

	const selectedLanguage = form.watch("language");

	function onSubmit(data: AccountFormValues) {
		showSubmittedData(data);
	}

	return (
		<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
			<Field data-invalid={!!form.formState.errors.name}>
				<FieldLabel htmlFor="name">Name</FieldLabel>
				<Input id="name" placeholder="Your name" {...form.register("name")} />
				<FieldDescription>
					This is the name that will be displayed on your profile and in emails.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.name]} />
			</Field>

			<Field className="flex-col" data-invalid={!!form.formState.errors.dob}>
				<FieldLabel htmlFor="dob">Date of birth</FieldLabel>
				<DatePicker
					onSelect={(date) => form.setValue("dob", date as Date)}
					selected={form.watch("dob")}
				/>
				<FieldDescription>
					Your date of birth is used to calculate your age.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.dob]} />
			</Field>

			<Field
				className="flex-col"
				data-invalid={!!form.formState.errors.language}
			>
				<FieldLabel htmlFor="language">Language</FieldLabel>
				<Popover>
					<PopoverTrigger
						render={
							<Button
								className={cn(
									"w-50 justify-between",
									!selectedLanguage && "text-muted-foreground"
								)}
								id="language"
								role="combobox"
								variant="outline"
							/>
						}
					>
						{selectedLanguage
							? languages.find(
									(language) => language.value === selectedLanguage
								)?.label
							: "Select language"}
						<ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
					</PopoverTrigger>
					<PopoverContent className="w-50 p-0">
						<Command>
							<CommandInput placeholder="Search language..." />
							<CommandEmpty>No language found.</CommandEmpty>
							<CommandGroup>
								<CommandList>
									{languages.map((language) => (
										<CommandItem
											key={language.value}
											onSelect={() => {
												form.setValue("language", language.value);
											}}
											value={language.label}
										>
											<Check
												className={cn(
													"size-4",
													language.value === selectedLanguage
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{language.label}
										</CommandItem>
									))}
								</CommandList>
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
				<FieldDescription>
					This is the language that will be used in the dashboard.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.language]} />
			</Field>

			<Button type="submit">Update account</Button>
		</form>
	);
}
