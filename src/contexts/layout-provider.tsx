import { createContext, useContext, useState } from "react";

import { getCookie, setCookie } from "@/lib/cookies";

export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarVariant = "inset" | "sidebar" | "floating";

// Cookie constants following the pattern from sidebar.tsx
const LAYOUT_COLLAPSIBLE_COOKIE_NAME = "layout_collapsible";
const LAYOUT_VARIANT_COOKIE_NAME = "layout_variant";
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Default values
const DEFAULT_VARIANT = "inset";
const DEFAULT_COLLAPSIBLE = "icon";

interface LayoutContextType {
	resetLayout: () => void;

	defaultCollapsible: SidebarCollapsible;
	collapsible: SidebarCollapsible;
	setCollapsible: (collapsible: SidebarCollapsible) => void;

	defaultVariant: SidebarVariant;
	variant: SidebarVariant;
	setVariant: (variant: SidebarVariant) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

interface LayoutProviderProps {
	children: React.ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
	const [collapsible, _setCollapsible] = useState<SidebarCollapsible>(() => {
		const saved = getCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME);
		return (saved as SidebarCollapsible) || DEFAULT_COLLAPSIBLE;
	});

	const [variant, _setVariant] = useState<SidebarVariant>(() => {
		const saved = getCookie(LAYOUT_VARIANT_COOKIE_NAME);
		return (saved as SidebarVariant) || DEFAULT_VARIANT;
	});

	const setCollapsible = (newCollapsible: SidebarCollapsible) => {
		_setCollapsible(newCollapsible);
		setCookie(
			LAYOUT_COLLAPSIBLE_COOKIE_NAME,
			newCollapsible,
			LAYOUT_COOKIE_MAX_AGE
		);
	};

	const setVariant = (newVariant: SidebarVariant) => {
		_setVariant(newVariant);
		setCookie(LAYOUT_VARIANT_COOKIE_NAME, newVariant, LAYOUT_COOKIE_MAX_AGE);
	};

	const resetLayout = () => {
		setCollapsible(DEFAULT_COLLAPSIBLE);
		setVariant(DEFAULT_VARIANT);
	};

	const contextValue: LayoutContextType = {
		resetLayout,
		defaultCollapsible: DEFAULT_COLLAPSIBLE,
		collapsible,
		setCollapsible,
		defaultVariant: DEFAULT_VARIANT,
		variant,
		setVariant,
	};

	return <LayoutContext value={contextValue}>{children}</LayoutContext>;
}

// Define the hook for the provider
export function useLayout() {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error("useLayout must be used within a LayoutProvider");
	}
	return context;
}
