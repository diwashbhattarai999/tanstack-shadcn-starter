import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Image } from "../ui/image";

export function AppTitle() {
	const { setOpenMobile } = useSidebar();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					className="gap-0 py-0 hover:bg-transparent active:bg-transparent"
					render={
						<div className="flex items-center justify-between gap-2">
							<Link
								className="flex items-center gap-2"
								onClick={() => setOpenMobile(false)}
								to="/"
							>
								<Image
									alt="GymGrow"
									className="h-8 w-8 rounded-lg object-contain dark:hidden"
									src="/images/OnlyG.png"
								/>
								<Image
									alt="GymGrow"
									className="hidden h-8 w-8 rounded-lg object-contain dark:block"
									src="/images/OnlyGwhite.png"
								/>
								<div className="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden">
									<span className="truncate font-bold">GymGrow</span>
									<span className="truncate text-xs">Admin</span>
								</div>
							</Link>
							<ToggleSidebar className="group-data-[collapsible=icon]:hidden" />
						</div>
					}
					size="lg"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function ToggleSidebar({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			className={cn("aspect-square size-8 max-md:scale-125", className)}
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			size="icon"
			variant="ghost"
			{...props}
		>
			<X className="md:hidden" />
			{/* <Menu className='max-md:hidden' /> */}
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}
