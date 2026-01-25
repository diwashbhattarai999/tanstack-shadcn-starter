import {
	Bell,
	BriefcaseBusiness,
	Building2,
	Calendar,
	Command,
	CreditCard,
	LayoutDashboard,
	MessageSquare,
	Monitor,
	Palette,
	Settings,
	Trophy,
	UserCog,
	Users,
	Wrench,
} from "lucide-react";

import { UserPermission } from "@/configs/roles";

import type { SidebarData } from "../types";

export const sidebarData: SidebarData = {
	user: {
		name: "admin",
		email: "admin@gymgrow.ai",
		avatar: "/avatars/01.png",
	},
	teams: [
		{
			name: "Gymgrow Admin",
			logo: Command,
			plan: "Superadmin",
		},
	],
	navGroups: [
		{
			title: "General",
			items: [
				{
					title: "Dashboard",
					url: "/",
					icon: LayoutDashboard,
				},
				{
					title: "Gyms",
					url: "/gyms",
					icon: Building2,
					permission: UserPermission.GYM,
				},
				{
					title: "Members",
					url: "/members",
					icon: Users,
					permission: UserPermission.USER,
				},
				{
					title: "Staff",
					url: "/staff",
					icon: BriefcaseBusiness,
					permission: [UserPermission.STAFF, UserPermission.ACCOUNT],
				},
				{
					title: "Classes",
					url: "/classes",
					icon: Calendar,
					permission: UserPermission.TRAINER,
				},
				{
					title: "Finance",
					url: "/finance",
					icon: CreditCard,
					permission: UserPermission.FINANCE,
				},
				{
					title: "Communications",
					url: "/communications",
					icon: MessageSquare,
					permission: UserPermission.CONTENT,
				},
				{
					title: "Leaderboard",
					url: "/leaderboard",
					icon: Trophy,
				},
			],
		},
		{
			title: "Other",
			items: [
				{
					title: "Settings",
					icon: Settings,
					items: [
						{
							title: "Profile",
							url: "/settings",
							icon: UserCog,
						},
						{
							title: "Account",
							url: "/settings/account",
							icon: Wrench,
						},
						{
							title: "Appearance",
							url: "/settings/appearance",
							icon: Palette,
						},
						{
							title: "Notifications",
							url: "/settings/notifications",
							icon: Bell,
						},
						{
							title: "Display",
							url: "/settings/display",
							icon: Monitor,
						},
					],
				},
			],
		},
	],
};
