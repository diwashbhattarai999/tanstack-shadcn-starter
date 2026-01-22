import type { ImgHTMLAttributes } from "react";

import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export function Logo({
	className,
	...props
}: ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<div className="h-20 w-60 overflow-hidden">
			<Image
				alt="GymGrow"
				className={cn("size-full dark:hidden", className)}
				fetchPriority="high"
				src="/logo/logo.svg"
				{...props}
			/>

			<Image
				alt="GymGrow"
				className={cn("hidden size-full dark:block", className)}
				fetchPriority="high"
				src="/logo/logo-white.svg"
				{...props}
			/>
		</div>
	);
}
