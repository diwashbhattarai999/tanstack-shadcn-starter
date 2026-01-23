/**
 * Available languages for the application.
 */
export const LANGUAGES = ["en", "ne"] as const;

/**
 * Type representing the available languages.
 */
export type Language = (typeof LANGUAGES)[number];

export const getLanguageLabel = (lang: Language): string => {
	switch (lang) {
		case "en":
			return "English";
		case "ne":
			return "नेपाली";
		default:
			return lang;
	}
};
