import { useLocation, useNavigate } from "@tanstack/react-router";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores/auth-store";

import { Button } from "../ui/button";

interface SignOutDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const { actions } = useAuthStore();

	const handleSignOut = () => {
		actions.reset();

		// Preserve current location for redirect after sign-in
		const currentPath = location.href;
		navigate({
			to: "/sign-in",
			search: { redirect: currentPath },
			replace: true,
		});
	};

	return (
		<AlertDialog onOpenChange={onOpenChange} open={open}>
			<AlertDialogContent className="sm:max-w-sm">
				<AlertDialogHeader className="text-start">
					<AlertDialogTitle>Sign out</AlertDialogTitle>
					<AlertDialogDescription
						render={
							<div>
								Are you sure you want to sign out? You will need to sign in
								again to access your account.
							</div>
						}
					/>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button onClick={handleSignOut} variant="destructive">
						Sign out
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
