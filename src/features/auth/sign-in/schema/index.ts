import z from "zod";

/**
 * Validation schema for the Sign-In form.
 *
 * This schema validates the email and password fields using Zod.
 */
export const signinSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z
		.string()
		.nonempty("Please enter your password")
		.min(7, "Password must be at least 7 characters long"),
});

/**
 * Type definition for the sign-in form data.
 */
export type SigninFormData = z.infer<typeof signinSchema>;
