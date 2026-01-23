import { isAxiosError } from "axios";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

/**
 * Structured API error response format.
 */
interface ApiErrorResponse {
	title?: string;
	message?: string;
	errors?: ApiFieldError[];
}

/**
 * Field-level validation error returned by the API.
 */
interface ApiFieldError {
	key: string[];
	message: string[];
}

/**
 * Safely shows multiple toast error messages.
 *
 * @param messages - Error messages to display
 */
function showToastErrors(messages: string[]): void {
	for (const message of messages) {
		toast.error(message);
	}
}

/**
 * Determines whether a form contains a given field name.
 *
 * @param form - React Hook Form instance
 * @param fieldName - Field key to check
 */
function formHasField<T extends FieldValues>(
	form: UseFormReturn<T>,
	fieldName: Path<T>
): boolean {
	return form.getValues(fieldName) !== undefined;
}

/**
 * Handles API errors by mapping field-level errors to React Hook Form
 * and displaying remaining errors via toast notifications.
 *
 * - Field-specific errors are applied to form inputs
 * - Non-field or global errors are shown as toast messages
 * - Falls back to a generic error message when structure is unknown
 *
 * @param error - HTTP error object returned from API request
 * @param form - Optional React Hook Form instance for field error mapping
 */
export function handleApiError<T extends FieldValues>(
	error: unknown,
	form?: UseFormReturn<T>
): void {
	console.error(error);

	if (!isAxiosError(error)) {
		toast.error("Something went wrong. Please try again.");
		return;
	}

	const responseData: ApiErrorResponse | undefined = error.response?.data;

	// No structured error response → fallback toast
	if (!responseData) {
		toast.error("Something went wrong. Please try again.");
		return;
	}

	const { errors, message } = responseData;

	// No field-level errors → show global message
	if (!(errors && Array.isArray(errors))) {
		toast.error(message ?? "Something went wrong. Please try again.");
		return;
	}

	for (const { key: fields, message: messages } of errors) {
		// No field keys → global toast errors
		if (!fields?.length) {
			showToastErrors(messages);
			continue;
		}

		for (const field of fields) {
			// Field exists in form → set RHF error
			if (form && formHasField(form, field as Path<T>)) {
				form.setError(field as Path<T>, {
					message: messages.join(", "),
				});
				continue;
			}

			// Field not present in form → toast fallback
			showToastErrors(messages);
		}
	}
}
