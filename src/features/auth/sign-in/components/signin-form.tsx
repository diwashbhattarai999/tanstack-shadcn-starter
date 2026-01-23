import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";

import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useSignin } from "../hooks/use-signin";
import type { SigninFormData } from "../schema";
import { signinSchema } from "../schema";

interface SigninFormProps extends React.HTMLAttributes<HTMLFormElement> {}

/**
 * SigninForm Component
 *
 * A reusable sign-in form using React Hook Form and Zod for validation.
 * Handles user input for email and password, integrates with the useSignin hook,
 * and provides user feedback via the isPending state.
 *
 * @param className - Optional additional class names for the form container.
 * @param props - Standard HTML form attributes.
 */
export const SigninForm = ({ className, ...props }: SigninFormProps) => {
	// Initialize the form with react-hook-form and zod validation
	const form = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
	});

	// Mutation for signing in
	const { mutate: signinMutation, isPending } = useSignin(form);

	/**
	 * Handles form submission
	 * @param data - The validated form data
	 */
	const onSubmit = (data: SigninFormData) => signinMutation(data);

	return (
		<form
			className={cn("grid gap-3", className)}
			onSubmit={form.handleSubmit(onSubmit)}
			{...props}
		>
			{/* Email field */}
			<Field>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<FieldContent>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						{...form.register("email")}
						aria-describedby="email-error"
						aria-invalid={!!form.formState.errors.email}
					/>
					<FieldError errors={[form.formState.errors.email]} id="email-error" />
				</FieldContent>
			</Field>

			{/* Password field */}
			<Field>
				<FieldLabel htmlFor="password">Password</FieldLabel>
				<FieldContent>
					<PasswordInput
						id="password"
						placeholder="********"
						{...form.register("password")}
						aria-describedby="password-error"
						aria-invalid={!!form.formState.errors.password}
					/>
					<FieldError
						errors={[form.formState.errors.password]}
						id="password-error"
					/>
				</FieldContent>
			</Field>

			{/* Submit button */}
			<Button
				className="mt-2 flex items-center justify-center gap-2"
				disabled={isPending}
			>
				{isPending ? <Loader2 className="animate-spin" /> : <LogIn />}
				Sign in
			</Button>
		</form>
	);
};
