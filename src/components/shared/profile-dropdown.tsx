import { Link } from "@tanstack/react-router";

import { SignOutDialog } from "@/components/shared/sign-out-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDialogState from "@/hooks/use-dialog-state";

export function ProfileDropdown() {
	const [open, setOpen] = useDialogState();

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger
					render={
						<Button className="relative h-8 w-8 rounded-full" variant="ghost">
							<Avatar className="h-8 w-8">
								<AvatarImage alt="@margintop" src="/margintop-logo.png" />
								<AvatarFallback>SN</AvatarFallback>
							</Avatar>
						</Button>
					}
				/>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col gap-1.5">
							<p className="font-medium text-sm leading-none">satnaing</p>
							<p className="text-muted-foreground text-xs leading-none">
								satnaingdev@gmail.com
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem
							render={
								<Link to="/settings">
									Profile
									<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
								</Link>
							}
						/>
						<DropdownMenuItem
							render={
								<Link to="/settings">
									Billing
									<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
								</Link>
							}
						/>
						<DropdownMenuItem
							render={
								<Link to="/settings">
									Settings
									<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
								</Link>
							}
						/>
						<DropdownMenuItem>New Team</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setOpen(true)} variant="destructive">
						Sign out
						<DropdownMenuShortcut className="text-current">
							⇧⌘Q
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<SignOutDialog onOpenChange={setOpen} open={!!open} />
		</>
	);
}
