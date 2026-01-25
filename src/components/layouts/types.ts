import type { LinkProps } from "@tanstack/react-router";

import type { TUserPermission } from "@/configs/roles";

interface User {
	name: string;
	email: string;
	avatar: string;
}

interface Team {
	name: string;
	logo: React.ElementType;
	plan: string;
}

interface BaseNavItem {
	title: string;
	badge?: string;
	icon?: React.ElementType;
	permission?: TUserPermission | TUserPermission[];
}

type NavLink = BaseNavItem & {
	url: LinkProps["to"] | (string & {});
	items?: never;
};

type NavCollapsible = BaseNavItem & {
	items: (BaseNavItem & { url: LinkProps["to"] | (string & {}) })[];
	url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
	title: string;
	items: NavItem[];
}

interface SidebarData {
	user: User;
	teams: Team[];
	navGroups: NavGroup[];
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
