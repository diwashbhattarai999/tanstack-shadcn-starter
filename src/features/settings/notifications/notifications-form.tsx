import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { showSubmittedData } from "@/lib/show-submitted-data";

const notificationsFormSchema = z.object({
	type: z.enum(["all", "mentions", "none"], {
		error: (iss) =>
			iss.input === undefined
				? "Please select a notification type."
				: undefined,
	}),
	mobile: z.boolean().default(false).optional(),
	communication_emails: z.boolean().default(false).optional(),
	social_emails: z.boolean().default(false).optional(),
	marketing_emails: z.boolean().default(false).optional(),
	security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
	communication_emails: false,
	marketing_emails: false,
	social_emails: true,
	security_emails: true,
};

export function NotificationsForm() {
	const form = useForm<NotificationsFormValues>({
		resolver: zodResolver(notificationsFormSchema),
		defaultValues,
	});

	return (
		<form
			className="space-y-8"
			onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
		>
			<Field
				className="relative space-y-3"
				data-invalid={!!form.formState.errors.type}
			>
				<FieldLabel>Notify me about...</FieldLabel>
				<RadioGroup
					className="flex flex-col gap-2"
					defaultValue={form.getValues("type")}
					onValueChange={(value) =>
						form.setValue("type", value as "all" | "mentions" | "none")
					}
				>
					<Field className="items-center" orientation="horizontal">
						<RadioGroupItem id="type-all" value="all" />
						<FieldLabel className="font-normal" htmlFor="type-all">
							All new messages
						</FieldLabel>
					</Field>
					<Field className="items-center" orientation="horizontal">
						<RadioGroupItem id="type-mentions" value="mentions" />
						<FieldLabel className="font-normal" htmlFor="type-mentions">
							Direct messages and mentions
						</FieldLabel>
					</Field>
					<Field className="items-center" orientation="horizontal">
						<RadioGroupItem id="type-none" value="none" />
						<FieldLabel className="font-normal" htmlFor="type-none">
							Nothing
						</FieldLabel>
					</Field>
				</RadioGroup>
				<FieldError errors={[form.formState.errors.type]} />
			</Field>

			<div className="relative">
				<h3 className="mb-4 font-medium text-lg">Email Notifications</h3>
				<div className="space-y-4">
					<Field
						className="justify-between rounded-lg border p-4"
						orientation="horizontal"
					>
						<FieldContent>
							<FieldLabel className="text-base" htmlFor="communication_emails">
								Communication emails
							</FieldLabel>
							<FieldDescription>
								Receive emails about your account activity.
							</FieldDescription>
						</FieldContent>
						<Switch
							checked={form.watch("communication_emails")}
							id="communication_emails"
							onCheckedChange={(checked) =>
								form.setValue("communication_emails", checked)
							}
						/>
					</Field>

					<Field
						className="justify-between rounded-lg border p-4"
						orientation="horizontal"
					>
						<FieldContent>
							<FieldLabel className="text-base" htmlFor="marketing_emails">
								Marketing emails
							</FieldLabel>
							<FieldDescription>
								Receive emails about new products, features, and more.
							</FieldDescription>
						</FieldContent>
						<Switch
							checked={form.watch("marketing_emails")}
							id="marketing_emails"
							onCheckedChange={(checked) =>
								form.setValue("marketing_emails", checked)
							}
						/>
					</Field>

					<Field
						className="justify-between rounded-lg border p-4"
						orientation="horizontal"
					>
						<FieldContent>
							<FieldLabel className="text-base" htmlFor="social_emails">
								Social emails
							</FieldLabel>
							<FieldDescription>
								Receive emails for friend requests, follows, and more.
							</FieldDescription>
						</FieldContent>
						<Switch
							checked={form.watch("social_emails")}
							id="social_emails"
							onCheckedChange={(checked) =>
								form.setValue("social_emails", checked)
							}
						/>
					</Field>

					<Field
						className="justify-between rounded-lg border p-4"
						orientation="horizontal"
					>
						<FieldContent>
							<FieldLabel className="text-base" htmlFor="security_emails">
								Security emails
							</FieldLabel>
							<FieldDescription>
								Receive emails about your account activity and security.
							</FieldDescription>
						</FieldContent>
						<Switch
							aria-readonly
							checked={form.watch("security_emails")}
							disabled
							id="security_emails"
							onCheckedChange={(checked) =>
								form.setValue("security_emails", checked)
							}
						/>
					</Field>
				</div>
			</div>

			<Field className="relative items-start" orientation="horizontal">
				<Checkbox
					checked={form.watch("mobile")}
					id="mobile"
					onCheckedChange={(checked) =>
						form.setValue("mobile", checked as boolean)
					}
				/>
				<FieldContent>
					<FieldLabel htmlFor="mobile">
						Use different settings for my mobile devices
					</FieldLabel>
					<FieldDescription>
						You can manage your mobile notifications in the{" "}
						<Link
							className="underline decoration-dashed underline-offset-4 hover:decoration-solid"
							to="/settings"
						>
							mobile settings
						</Link>{" "}
						page.
					</FieldDescription>
				</FieldContent>
			</Field>

			<Button type="submit">Update notifications</Button>
		</form>
	);
}
