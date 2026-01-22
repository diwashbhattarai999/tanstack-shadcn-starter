import { ScriptOnce } from "@tanstack/react-router";
import { createClientOnlyFn, createIsomorphicFn } from "@tanstack/react-start";
import { createContext, type ReactNode, use, useEffect, useState } from "react";

import { APP_CONFIG } from "@/configs/app";
import { STORAGE_KEYS } from "@/configs/storage";
import {
	type AppTheme,
	type UserTheme,
	UserThemeSchema,
} from "@/configs/themes";

// Storage key (consistent with app config)
const themeStorageKey = STORAGE_KEYS.THEME;

// Helpers
const getStoredUserTheme = createIsomorphicFn()
	.server((): UserTheme => APP_CONFIG.defaultTheme)
	.client((): UserTheme => {
		const stored = localStorage.getItem(themeStorageKey);
		return stored ? UserThemeSchema.parse(stored) : APP_CONFIG.defaultTheme;
	});

const setStoredTheme = createClientOnlyFn((theme: UserTheme) => {
	const validated = UserThemeSchema.parse(theme);
	localStorage.setItem(themeStorageKey, validated);
});

const getSystemTheme = createIsomorphicFn()
	.server((): AppTheme => "light")
	.client(
		(): AppTheme =>
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
	);

const handleThemeChange = createClientOnlyFn((userTheme: UserTheme) => {
	const validated = UserThemeSchema.parse(userTheme);
	const root = document.documentElement;
	root.classList.remove("light", "dark", "system");
	if (validated === "system") {
		const sys = getSystemTheme();
		root.classList.add(sys, "system");
	} else {
		root.classList.add(validated);
	}
});

const setupPreferredListener = createClientOnlyFn(() => {
	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	const handler = () => handleThemeChange("system");
	mq.addEventListener("change", handler);
	return () => mq.removeEventListener("change", handler);
});

// Inline script to prevent FOUC (pre-hydration)
// Uses APP_CONFIG.defaultTheme when storage is empty
const themeScript = (() => {
	function themeFn(dt: string) {
		try {
			const storedTheme = localStorage.getItem("tanstack-starter-theme") || dt;
			const validTheme = ["light", "dark", "system"].includes(storedTheme)
				? storedTheme
				: dt;
			if (validTheme === "system") {
				const sys = window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light";
				document.documentElement.classList.add(sys, "system");
			} else {
				document.documentElement.classList.add(validTheme);
			}
		} catch {
			const sys = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
			document.documentElement.classList.add(sys, "system");
		}
	}
	return `(${themeFn.toString()})('${APP_CONFIG.defaultTheme}')`;
})();

interface ThemeProviderProps {
	children: ReactNode;
}

interface ThemeContextProps {
	userTheme: UserTheme;
	appTheme: AppTheme;
	setTheme: (theme: UserTheme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [userTheme, setUserTheme] = useState<UserTheme>(getStoredUserTheme);

	// Apply theme whenever userTheme changes
	useEffect(() => {
		handleThemeChange(userTheme);
	}, [userTheme]);

	// Listen to OS changes when on system
	useEffect(() => {
		if (userTheme !== "system") return;
		return setupPreferredListener();
	}, [userTheme]);

	const appTheme = userTheme === "system" ? getSystemTheme() : userTheme;

	const setTheme = (newUserTheme: UserTheme) => {
		const validatedTheme = UserThemeSchema.parse(newUserTheme);
		setUserTheme(validatedTheme);
		setStoredTheme(validatedTheme);
		handleThemeChange(validatedTheme);
	};

	return (
		<ThemeContext value={{ userTheme, appTheme, setTheme }}>
			{/** biome-ignore lint/correctness/noChildrenProp: ScriptOnce requires children prop */}
			<ScriptOnce children={themeScript} />
			{children}
		</ThemeContext>
	);
}

export const useTheme = () => {
	const context = use(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
