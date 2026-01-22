import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-providers";
import { cn } from "@/lib/utils";

const themeConfig = {
	light: { icon: Sun, label: "Light" },
	dark: { icon: Moon, label: "Dark" },
	system: { icon: Monitor, label: "System" },
};

export function ThemeToggle() {
	const { userTheme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button size="icon" variant="outline">
						<Sun
							className={cn("hidden h-[1.2rem] w-[1.2rem] transition-all", {
								inline: userTheme === "light",
							})}
						/>

						<Moon
							className={cn("hidden h-[1.2rem] w-[1.2rem] transition-all", {
								inline: userTheme === "dark",
							})}
						/>

						<Monitor
							className={cn("hidden h-[1.2rem] w-[1.2rem] transition-all", {
								inline: userTheme === "system",
							})}
						/>

						<span className="sr-only">Toggle theme</span>
					</Button>
				}
			/>
			<DropdownMenuContent align="center">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					{themeConfig.light.label}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					{themeConfig.dark.label}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					{themeConfig.system.label}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
