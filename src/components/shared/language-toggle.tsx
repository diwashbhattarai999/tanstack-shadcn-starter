import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/language-provider";
import type { Language } from "@/i18n";

/**
 * LanguageToggle component to switch between different languages.
 *
 * This component uses the Popover component to allow users to choose a language.
 * It utilizes the useLanguage hook to access the current language and a function to change it.
 */
export default function LanguageToggle() {
	// Get the current language, function to set language, available languages, and display names from the context
	const { language, setLanguage, getAvailableLanguages } = useLanguage();

	const handleLanguageChange = (newLanguage: Language | null) => {
		if (newLanguage) setLanguage(newLanguage);
		else return;
	};

	const items = getAvailableLanguages().map(({ locale, name }) => ({
		value: locale,
		label: name,
	}));

	return (
		<Select items={items} onValueChange={handleLanguageChange} value={language}>
			<SelectTrigger className="w-full max-w-48">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Languages</SelectLabel>
					{items.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
