import { env } from "@/env";

import type { UserTheme } from "./themes";

export interface AppConfig {
	name: string;
	description: string;
	url: string;
	seoImage: string;
	themeColor: string;
	icons: {
		light: string;
		dark: string;
		appleTouch: string;
		favicon16: string;
		favicon32: string;
		faviconIco: string;
	};
	manifest: string;
	defaultTheme: UserTheme;
}

export const APP_CONFIG: AppConfig = {
	name: env.VITE_APP_NAME || "GymGrow",
	description: "Admin Dashboard UI built for GymGrow.",
	url: env.VITE_PUBLIC_URL || "https://admin.gymgrow.com",
	seoImage: "/logo512.png",
	themeColor: "#fff",
	icons: {
		light: "/logo/logo-icon.png",
		dark: "/logo/logo-icon-white.png",
		appleTouch: "/apple-touch-icon.png",
		favicon16: "/favicon-16x16.png",
		favicon32: "/favicon-32x32.png",
		faviconIco: "/faviconn.ico",
	},
	manifest: "/manifest.json",
	defaultTheme: "system",
};

export type { AppConfig as TAppConfig };
