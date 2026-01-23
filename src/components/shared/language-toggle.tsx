import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getLanguageLabel, type Language } from "@/configs/languages";
import { getLocale, locales, setLocale } from "@/paraglide/runtime";

/**
 * LanguageToggle component to switch between different languages using paraglide runtime.
 */
export default function LanguageToggle() {
	const currentLocale = getLocale();
	const items = locales.map((locale) => ({
		value: locale,
		label: getLanguageLabel(locale),
	}));

	const handleLanguageChange = (newLocale: Language | null) => {
		if (newLocale && newLocale !== currentLocale) setLocale(newLocale);
	};

	return (
		<Select
			items={items}
			onValueChange={handleLanguageChange}
			value={currentLocale}
		>
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
