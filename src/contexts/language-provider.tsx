import { ScriptOnce } from "@tanstack/react-router";
import { createClientOnlyFn, createIsomorphicFn } from "@tanstack/react-start";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { APP_CONFIG } from "@/configs/app";
import { LANGUAGES, type Language } from "@/i18n";

// Props for the LanguageProvider component
interface LanguageProviderProps {
	children: React.ReactNode;
	defaultLanguage?: Language;
	storageKey?: string;
}

// State type for the language provider
interface LanguageProviderState {
	language: Language;
	setLanguage: (language: Language) => void;
	getAvailableLanguages: () => Array<{ locale: Language; name: string }>;
	getDisplayName: (locale: string, displayLocale?: string) => string;
}

// Initial state for the language provider
const initialState: LanguageProviderState = {
	language: APP_CONFIG.defaultLanguage || "en",
	setLanguage: () => null,
	getAvailableLanguages: () => [],
	getDisplayName: () => "",
};

// Create a context for the language provider
const LanguageProviderContext =
	createContext<LanguageProviderState>(initialState);

// Zod schema for strong validation
const LanguageSchema = z
	.enum(LANGUAGES)
	.catch(APP_CONFIG.defaultLanguage as Language);

// helpers (SSR-safe)
const languageStorageKey = "i18nextLng";

const getStoredLanguage = createIsomorphicFn()
	.server((): Language => APP_CONFIG.defaultLanguage)
	.client((): Language => {
		const stored = localStorage.getItem(languageStorageKey);
		return stored ? LanguageSchema.parse(stored) : APP_CONFIG.defaultLanguage;
	});

const setStoredLanguage = createClientOnlyFn((lang: Language) => {
	const validated = LanguageSchema.parse(lang);
	localStorage.setItem(languageStorageKey, validated);
});

const setHtmlLang = createClientOnlyFn((lang: Language) => {
	document.documentElement.lang = lang;
});

// Inline script to set <html lang> pre-hydration to avoid flicker/mismatch
const languageScript = (() => {
	const defaultLang = APP_CONFIG.defaultLanguage;
	function langFn(dl: string) {
		try {
			const stored = localStorage.getItem("i18nextLng") || dl;
			document.documentElement.setAttribute("lang", stored);
		} catch {
			document.documentElement.setAttribute("lang", dl);
		}
	}
	return `(${langFn.toString()})('${defaultLang}')`;
})();

/**
 * LanguageProvider component to provide language context to the application.
 *
 * This component initializes the i18n library with the provided languages and sets up the context for managing the current language.
 * It allows components to access and change the current language through the context.
 */
export function LanguageProvider({
	children,
	defaultLanguage = APP_CONFIG.defaultLanguage,
	storageKey = "i18nextLng",
	...props
}: LanguageProviderProps) {
	const { i18n } = useTranslation();

	const [language, setLanguageState] = useState<Language>(getStoredLanguage);

	// Initialize i18n and html lang on mount and when language changes
	useEffect(() => {
		setHtmlLang(language);
		i18n.changeLanguage(language);
	}, [i18n, language]);

	// Memoize the available languages to avoid unnecessary recalculations
	const getAvailableLanguages = useMemo(() => {
		const getLocaleDisplayName = (locale: string, displayLocale?: string) => {
			const displayName =
				new Intl.DisplayNames([displayLocale || locale], {
					type: "language",
				}).of(locale) ?? locale;
			return displayName.charAt(0).toLocaleUpperCase() + displayName.slice(1);
		};

		return LANGUAGES.map((locale) => ({
			locale,
			name: getLocaleDisplayName(locale),
		}));
	}, []);

	// Function to get the display name of a locale
	const getLocaleDisplayName = (locale: string, displayLocale?: string) => {
		const displayName =
			new Intl.DisplayNames([displayLocale || locale], {
				type: "language",
			}).of(locale) ?? locale;
		return displayName.charAt(0).toLocaleUpperCase() + displayName.slice(1);
	};

	// Function to handle language change
	const handleLanguageChange = (newLanguage: Language) => {
		setStoredLanguage(newLanguage);
		setHtmlLang(newLanguage);
		i18n.changeLanguage(newLanguage);
		setLanguageState(newLanguage);
	};

	// Value to be provided to the context
	const value = {
		language,
		setLanguage: handleLanguageChange,
		getAvailableLanguages: () => getAvailableLanguages,
		getDisplayName: (locale: string, displayLocale?: string) =>
			getLocaleDisplayName(locale, displayLocale),
	};

	return (
		<LanguageProviderContext.Provider {...props} value={value}>
			{/** biome-ignore lint/correctness/noChildrenProp: ScriptOnce requires children prop */}
			<ScriptOnce children={languageScript} />
			{children}
		</LanguageProviderContext.Provider>
	);
}

/**
 * Custom hook to use the LanguageProvider context.
 * This hook provides access to the current language and a function to change it.
 */
export const useLanguage = () => {
	// Get the context value
	const context = useContext(LanguageProviderContext);

	// Throw an error if the context is undefined, indicating that the hook must be used within a LanguageProvider
	if (context === undefined)
		throw new Error("useLanguage must be used within a LanguageProvider");

	// Return the context value
	return context;
};
