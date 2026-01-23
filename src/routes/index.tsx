import { createFileRoute } from "@tanstack/react-router";

import { Logo } from "@/assets/logo";
import LanguageToggle from "@/components/shared/language-toggle.js";
import { ThemeToggle } from "@/components/shared/theme-toggle";

import { m } from "../paraglide/messages.js";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="flex size-full min-h-screen flex-col items-center justify-center gap-4">
			<Logo />
			<ThemeToggle />
			<LanguageToggle />

			{m.example_message({ username: "Diwash" })}
		</main>
	);
}
