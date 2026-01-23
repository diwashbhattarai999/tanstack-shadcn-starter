import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { login } from "@/api/auth";
import { handleApiError } from "@/lib/handle-error";
import { useAuthStore } from "@/stores/auth-store";

import type { SigninFormData } from "../schema";

/**
 * Custom hook for handling the sign-in form submission.
 *
 * @param form - The `react-hook-form` instance for the sign-in form, used to display field-level errors.
 * @returns A mutation object from `react-query` for handling login.
 */
export const useSignin = (form: UseFormReturn<SigninFormData>) => {
	const { redirect } = useSearch({ from: "/(auth)/sign-in" });
	const navigate = useNavigate();
	const { actions } = useAuthStore();

	return useMutation({
		/** Mutation function to call the login API */
		mutationFn: login,

		/** Called when login is successful */
		onSuccess: (response) => {
			const { data: responseData } = response;

			// Ensure response format is valid
			if (!responseData?.data) {
				throw new Error("Invalid response format: missing data property");
			}

			const { accessToken, refreshToken, ...user } = responseData.data;

			// Update global auth store
			actions.setUser(user);
			actions.setAccessToken(accessToken);
			actions.setRefreshToken(refreshToken);

			// Show success toast
			toast.success(`Welcome back, ${user.email}!`);

			// Navigate to redirect path or home
			const targetPath = redirect || "/";
			navigate({ to: targetPath, replace: true });
		},

		/** Called when login fails */
		onError: (error: unknown) => {
			handleApiError<SigninFormData>(error, form);
		},
	});
};
