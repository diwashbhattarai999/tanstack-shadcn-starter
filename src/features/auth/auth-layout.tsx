import type { ReactNode } from "react";

import { Logo } from "@/assets/logo";

/**
 * Props for the `AuthLayout` component.
 */
interface AuthLayoutProps {
	/** The content to render inside the layout, e.g., login or registration forms */
	children: ReactNode;
}

/**
 * `AuthLayout` is a layout component specifically for authentication pages
 * such as login, register, or password reset.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="container grid h-svh max-w-none items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-120 sm:p-8">
				{/* Logo at the top of the auth form */}
				<div className="flex items-center justify-center">
					<Logo />
				</div>

				{/* Render the auth form content */}
				{children}
			</div>
		</div>
	);
}
