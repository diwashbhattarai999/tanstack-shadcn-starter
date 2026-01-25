import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { cn } from "@/lib/utils";

const profileFormSchema = z.object({
	username: z
		.string("Please enter your username.")
		.min(2, "Username must be at least 2 characters.")
		.max(30, "Username must not be longer than 30 characters."),
	email: z.email({
		error: (iss) =>
			iss.input === undefined
				? "Please select an email to display."
				: undefined,
	}),
	bio: z.string().max(160).min(4),
	urls: z
		.array(
			z.object({
				value: z.url("Please enter a valid URL."),
			})
		)
		.optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	bio: "I own a computer.",
	urls: [
		{ value: "https://shadcn.com" },
		{ value: "http://twitter.com/shadcn" },
	],
};

export function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});

	const { fields, append } = useFieldArray({
		name: "urls",
		control: form.control,
	});

	return (
		<form
			className="space-y-8"
			onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
		>
			<Field data-invalid={!!form.formState.errors.username}>
				<FieldLabel htmlFor="username">Username</FieldLabel>
				<Input
					id="username"
					placeholder="shadcn"
					{...form.register("username")}
				/>
				<FieldDescription>
					This is your public display name. It can be your real name or a
					pseudonym. You can only change this once every 30 days.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.username]} />
			</Field>

			<Field data-invalid={!!form.formState.errors.email}>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<Select
					defaultValue={form.getValues("email")}
					onValueChange={(value) => form.setValue("email", value ?? "")}
				>
					<SelectTrigger id="email">
						<SelectValue placeholder="Select a verified email to display" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="m@example.com">m@example.com</SelectItem>
						<SelectItem value="m@google.com">m@google.com</SelectItem>
						<SelectItem value="m@support.com">m@support.com</SelectItem>
					</SelectContent>
				</Select>
				<FieldDescription>
					You can manage verified email addresses in your{" "}
					<Link to="/">email settings</Link>.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.email]} />
			</Field>

			<Field data-invalid={!!form.formState.errors.bio}>
				<FieldLabel htmlFor="bio">Bio</FieldLabel>
				<Textarea
					className="resize-none"
					id="bio"
					placeholder="Tell us a little bit about yourself"
					{...form.register("bio")}
				/>
				<FieldDescription>
					You can <span>@mention</span> other users and organizations to link to
					them.
				</FieldDescription>
				<FieldError errors={[form.formState.errors.bio]} />
			</Field>

			<div>
				{fields.map((field, index) => (
					<Field
						data-invalid={!!form.formState.errors.urls?.[index]?.value}
						key={field.id}
					>
						<FieldLabel
							className={cn(index !== 0 && "sr-only")}
							htmlFor={`urls.${index}.value`}
						>
							URLs
						</FieldLabel>
						<FieldDescription className={cn(index !== 0 && "sr-only")}>
							Add links to your website, blog, or social media profiles.
						</FieldDescription>
						<Input
							className={cn(index !== 0 && "mt-1.5")}
							id={`urls.${index}.value`}
							{...form.register(`urls.${index}.value`)}
						/>
						<FieldError errors={[form.formState.errors.urls?.[index]?.value]} />
					</Field>
				))}
				<Button
					className="mt-2"
					onClick={() => append({ value: "" })}
					size="sm"
					type="button"
					variant="outline"
				>
					Add URL
				</Button>
			</div>

			<Button type="submit">Update profile</Button>
		</form>
	);
}
