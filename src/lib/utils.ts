import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for conditionally composing class names
 * with intelligent Tailwind CSS conflict resolution.
 *
 * This function combines:
 * - `clsx` for conditional class name handling
 * - `tailwind-merge` for resolving conflicting Tailwind utility classes
 *
 * It is intended to be used everywhere class names are composed
 * to ensure predictable styling behavior.
 *
 * @param inputs - A list of class values (strings, arrays, objects, or falsy values)
 * @returns A merged and de-duplicated class name string
 *
 * @example
 * ```ts
 * cn(
 *   "px-4 py-2",
 *   isActive && "bg-primary",
 *   isDisabled ? "opacity-50" : "opacity-100",
 * 	 { "text-lg": size === "large" }
 * );
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
