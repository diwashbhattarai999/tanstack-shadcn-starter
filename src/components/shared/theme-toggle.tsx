import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-providers";
import { useIsMounted } from "@/hooks/use-is-mounted";

export function ThemeToggle() {
	const { userTheme, setTheme } = useTheme();
	const isMounted = useIsMounted();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
				{isMounted && (
					<>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</>
				)}

				<span className="sr-only">Toggle theme</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="center">
				<DropdownMenuCheckboxItem
					checked={userTheme === "light"}
					onCheckedChange={() => setTheme("light")}
				>
					Light
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={userTheme === "dark"}
					onCheckedChange={() => setTheme("dark")}
				>
					Dark
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={userTheme === "system"}
					onCheckedChange={() => setTheme("system")}
				>
					System
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
