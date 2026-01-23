import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { AuthLayout } from "../auth-layout";
import { SigninForm } from "./components/signin-form";

/**
 * `SignIn` component renders the sign-in page of the application.
 */
export function SignIn() {
	return (
		<AuthLayout>
			<Card className="gap-4">
				{/* Card header with title and description */}
				<CardHeader>
					<CardTitle className="text-lg tracking-tight">Sign in</CardTitle>
					<CardDescription>
						Enter your email and password below to <br />
						log into your account
					</CardDescription>
				</CardHeader>

				{/* Main form content */}
				<CardContent>
					<SigninForm />
				</CardContent>

				{/* Footer with terms and privacy links */}
				<CardFooter>
					<p className="px-8 text-center text-muted-foreground text-sm">
						By clicking sign in, you agree to our{" "}
						<a
							className="underline underline-offset-4 hover:text-primary"
							href="/terms"
						>
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							className="underline underline-offset-4 hover:text-primary"
							href="/privacy"
						>
							Privacy Policy
						</a>
						.
					</p>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
