import { createFileRoute, Link } from "@tanstack/react-router";

import { Logo } from "@/assets/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getLocale, locales, setLocale } from "@/paraglide/runtime";

import { m } from "../paraglide/messages.js";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="flex size-full min-h-screen flex-col items-center justify-center gap-4">
			<Logo />
			<ThemeToggle />

			<div className="flex justify-between gap-2 p-2 text-lg">
				<div className="flex gap-2 text-lg">
					<Link
						activeOptions={{ exact: true }}
						activeProps={{
							className: "font-bold",
						}}
						to="/"
					>
						{m.home_page()}
					</Link>

					<Link
						activeProps={{
							className: "font-bold",
						}}
						to="/about"
					>
						{m.about_page()}
					</Link>
				</div>

				<div className="flex gap-2 text-lg">
					{locales.map((locale) => (
						<button
							className="cursor-pointer rounded border border-gray-300 p-1 px-2 data-[active-locale=true]:bg-gray-500 data-[active-locale=true]:text-white"
							data-active-locale={locale === getLocale()}
							key={locale}
							onClick={() => setLocale(locale)}
							type="button"
						>
							{locale}
						</button>
					))}
				</div>
			</div>

			{m.example_message({ username: "Diwash" })}
		</main>
	);
}
