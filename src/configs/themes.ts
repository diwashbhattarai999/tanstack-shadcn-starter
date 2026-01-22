import { z } from "zod";

// User's explicit choice: light, dark, or system (automatic)
export const USER_THEMES = ["light", "dark", "system"] as const;
export type UserTheme = (typeof USER_THEMES)[number];

// Actual theme applied: light or dark (resolved theme)
export const APP_THEMES = ["light", "dark"] as const;
export type AppTheme = (typeof APP_THEMES)[number];

// Zod schemas for validation
export const UserThemeSchema = z.enum(USER_THEMES).catch("system" as const);

export const AppThemeSchema = z.enum(APP_THEMES).catch("light" as const);
