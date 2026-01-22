import type React from "react";

import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image = ({
	src,
	alt,
	width,
	height,
	className,
	...props
}: ImageProps) => {
	return (
		<img
			alt={alt}
			className={cn("object-cover", className)}
			height={height}
			src={src}
			width={width}
			{...props}
		/>
	);
};
