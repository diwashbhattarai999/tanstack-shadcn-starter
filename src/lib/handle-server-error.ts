import { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Displays a user-friendly error message for unexpected or server-side errors.
 *
 * This helper is intended for **global / non-form-specific** error handling,
 * such as failed data fetching, server failures, or unexpected API responses.
 *
 * Supported cases:
 * - HTTP 204 (No Content / Not Found–like scenarios)
 * - Axios errors with a structured server response
 * - Unknown or non-Axios errors (fallback message)
 *
 * @param error - An unknown error object thrown by API calls or runtime logic.
 *
 * @example
 * ```ts
 * try {
 *   await api.get("/users");
 * } catch (error) {
 *   handleServerError(error);
 * }
 * ```
 */
export function handleServerError(error: unknown): void {
	// Default fallback message for unknown errors
	let errorMessage = "Something went wrong. Please try again later.";

	/**
	 * Handle cases where the error is a plain object
	 * and contains a `status` property (e.g. fetch-like errors).
	 */
	if (
		error !== null &&
		typeof error === "object" &&
		"status" in error &&
		Number((error as { status?: number }).status) === 204
	) {
		errorMessage = "Content not found.";
	}

	/**
	 * Handle Axios-specific errors.
	 * Prefer server-provided titles when available.
	 */
	if (error instanceof AxiosError) {
		errorMessage =
			error.response?.data?.title ?? error.response?.statusText ?? errorMessage;
	}

	// Display the resolved error message to the user
	toast.error(errorMessage);
}
