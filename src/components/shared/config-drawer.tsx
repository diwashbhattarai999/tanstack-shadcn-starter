import { Radio } from "@base-ui/react";
import { CircleCheck, RotateCcw, Settings } from "lucide-react";
import type * as React from "react";

import { IconLayoutCompact } from "@/assets/custom/icon-layout-compact";
import { IconLayoutDefault } from "@/assets/custom/icon-layout-default";
import { IconLayoutFull } from "@/assets/custom/icon-layout-full";
import { IconSidebarFloating } from "@/assets/custom/icon-sidebar-floating";
import { IconSidebarInset } from "@/assets/custom/icon-sidebar-inset";
import { IconSidebarSidebar } from "@/assets/custom/icon-sidebar-sidebar";
import { IconThemeDark } from "@/assets/custom/icon-theme-dark";
import { IconThemeLight } from "@/assets/custom/icon-theme-light";
import { IconThemeSystem } from "@/assets/custom/icon-theme-system";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { APP_CONFIG } from "@/configs/app";
import {
	type SidebarCollapsible,
	type SidebarVariant,
	useLayout,
} from "@/contexts/layout-provider";
import { useTheme } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";

import { useSidebar } from "../ui/sidebar";

function CustomRadioGroup({
	options,
	value,
	onValueChange,
	name,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedby,
}: {
	options: Array<{
		value: string;
		label: string;
		icon: React.ComponentType<{ className?: string }>;
	}>;
	value: string;
	onValueChange: (value: string) => void;
	name?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
}) {
	return (
		<RadioGroup
			aria-describedby={ariaDescribedby}
			aria-label={ariaLabel}
			className="grid w-full max-w-md grid-cols-3 gap-4"
			name={name}
			onValueChange={onValueChange}
			value={value}
		>
			{options.map((item) => (
				<div className="flex flex-col items-center" key={item.value}>
					<Radio.Root
						className={cn(
							"relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-muted bg-primary/20 transition-all hover:border-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary data-[state=checked]:border-primary"
						)}
						data-slot="radio-group-item"
						value={item.value}
					>
						<Radio.Indicator>
							<CircleCheck
								aria-hidden="true"
								className={cn(
									"size-6 fill-primary stroke-primary-foreground",
									"absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",
									"data-[state=unchecked]:hidden"
								)}
							/>
						</Radio.Indicator>
						<item.icon className="size-full object-contain" />
					</Radio.Root>

					<div
						aria-live="polite"
						className="mt-2 text-xs"
						id={`${item.value}-description`}
					>
						{item.label}
					</div>
				</div>
			))}
		</RadioGroup>
	);
}

export function ConfigDrawer() {
	const { setOpen } = useSidebar();
	const { resetTheme } = useTheme();
	const { resetLayout } = useLayout();

	const handleReset = () => {
		setOpen(true);
		resetTheme();
		resetLayout();
	};

	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button
						aria-describedby="config-drawer-description"
						aria-label="Open theme settings"
						className="rounded-full"
						size="icon"
						variant="ghost"
					/>
				}
			>
				<Settings aria-hidden="true" />
			</SheetTrigger>
			<SheetContent className="flex flex-col">
				<SheetHeader className="pb-0 text-start">
					<SheetTitle>Theme Settings</SheetTitle>
					<SheetDescription id="config-drawer-description">
						Adjust the appearance and layout to suit your preferences.
					</SheetDescription>
				</SheetHeader>
				<div className="space-y-6 overflow-y-auto px-4">
					<ThemeConfig />
					<SidebarConfig />
					<LayoutConfig />
				</div>
				<SheetFooter className="gap-2">
					<Button
						aria-label="Reset all settings to default values"
						onClick={handleReset}
						variant="destructive"
					>
						Reset
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

function SectionTitle({
	title,
	showReset = false,
	onReset,
	className,
}: {
	title: string;
	showReset?: boolean;
	onReset?: () => void;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"mb-2 flex items-center gap-2 font-semibold text-muted-foreground text-sm",
				className
			)}
		>
			{title}
			{showReset && onReset && (
				<Button
					className="size-4 rounded-full"
					onClick={onReset}
					size="icon"
					variant="ghost"
				>
					<RotateCcw className="size-3" />
				</Button>
			)}
		</div>
	);
}

// Removed custom RadioGroupItem, using base-ui RadioGroupItem instead

const themeOptions = [
	{
		value: "system",
		label: "System",
		icon: IconThemeSystem,
	},
	{
		value: "light",
		label: "Light",
		icon: IconThemeLight,
	},
	{
		value: "dark",
		label: "Dark",
		icon: IconThemeDark,
	},
];

function ThemeConfig() {
	const { userTheme, setTheme } = useTheme();
	return (
		<div>
			<SectionTitle
				onReset={() => setTheme(APP_CONFIG.defaultTheme)}
				showReset={userTheme !== APP_CONFIG.defaultTheme}
				title="Theme"
			/>
			<CustomRadioGroup
				aria-describedby="theme-description"
				aria-label="Select theme preference"
				name="theme"
				onValueChange={(v) => setTheme(v as "system" | "light" | "dark")}
				options={themeOptions}
				value={userTheme}
			/>
			<div className="sr-only" id="theme-description">
				Choose between system preference, light mode, or dark mode
			</div>
		</div>
	);
}

const sidebarOptions = [
	{
		value: "inset",
		label: "Inset",
		icon: IconSidebarInset,
	},
	{
		value: "floating",
		label: "Floating",
		icon: IconSidebarFloating,
	},
	{
		value: "sidebar",
		label: "Sidebar",
		icon: IconSidebarSidebar,
	},
];

function SidebarConfig() {
	const { defaultVariant, variant, setVariant } = useLayout();

	return (
		<div className="max-md:hidden">
			<SectionTitle
				onReset={() => setVariant(defaultVariant)}
				showReset={defaultVariant !== variant}
				title="Sidebar"
			/>
			<CustomRadioGroup
				aria-describedby="sidebar-description"
				aria-label="Select sidebar style"
				name="sidebar"
				onValueChange={(v) => setVariant(v as SidebarVariant)}
				options={sidebarOptions}
				value={variant}
			/>
			<div className="sr-only" id="sidebar-description">
				Choose between inset, floating, or standard sidebar layout
			</div>
		</div>
	);
}

const layoutOptions = [
	{
		value: "default",
		label: "Default",
		icon: IconLayoutDefault,
	},
	{
		value: "icon",
		label: "Compact",
		icon: IconLayoutCompact,
	},
	{
		value: "offcanvas",
		label: "Full layout",
		icon: IconLayoutFull,
	},
];

function LayoutConfig() {
	const { open, setOpen } = useSidebar();
	const { defaultCollapsible, collapsible, setCollapsible } = useLayout();

	const radioState = open ? "default" : collapsible;

	return (
		<div className="max-md:hidden">
			<SectionTitle
				onReset={() => {
					setOpen(true);
					setCollapsible(defaultCollapsible);
				}}
				showReset={radioState !== "default"}
				title="Layout"
			/>
			<CustomRadioGroup
				aria-describedby="layout-description"
				aria-label="Select layout style"
				name="layout"
				onValueChange={(v) => {
					if (v === "default") {
						setOpen(true);
						return;
					}
					setOpen(false);
					setCollapsible(v as SidebarCollapsible);
				}}
				options={layoutOptions}
				value={radioState}
			/>
			<div className="sr-only" id="layout-description">
				Choose between default expanded, compact icon-only, or full layout mode
			</div>
		</div>
	);
}
