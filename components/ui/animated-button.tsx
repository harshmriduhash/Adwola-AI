"use client";

import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| "gradient"
		| "glow";
	animation?: "scale" | "glow" | "pulse" | "bounce" | "slide" | "ripple";
	children: React.ReactNode;
	className?: string;
	size?: "default" | "sm" | "lg" | "icon";
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	asChild?: boolean;
	onClick?: () => void;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
	(
		{ className, variant = "default", animation = "scale", children, ...props },
		ref,
	) => {
		const getVariant = () => {
			switch (variant) {
				case "gradient":
					return "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0";
				case "glow":
					return "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40";
				default:
					return "";
			}
		};

		const getAnimation = () => {
			switch (animation) {
				case "scale":
					return {
						whileHover: { scale: 1.05 },
						whileTap: { scale: 0.98 },
						transition: {
							type: "spring" as const,
							stiffness: 400,
							damping: 17,
						},
					};
				case "glow":
					return {
						whileHover: {
							boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
							y: -2,
						},
						whileTap: { scale: 0.98 },
						transition: { duration: 0.2 },
					};
				case "pulse":
					return {
						whileHover: {
							scale: [1, 1.05, 1],
							transition: {
								duration: 0.6,
								repeat: Infinity,
								repeatType: "loop" as const,
							},
						},
						whileTap: { scale: 0.98 },
					};
				case "bounce":
					return {
						whileHover: {
							y: [-2, -8, -2],
							transition: {
								duration: 0.6,
								repeat: Infinity,
								repeatType: "loop" as const,
							},
						},
						whileTap: { scale: 0.98 },
					};
				case "slide":
					return {
						whileHover: { x: 4 },
						whileTap: { scale: 0.98 },
						transition: {
							type: "spring" as const,
							stiffness: 400,
							damping: 17,
						},
					};
				case "ripple":
					return {
						whileHover: { scale: 1.02 },
						whileTap: { scale: 0.98 },
						transition: {
							type: "spring" as const,
							stiffness: 400,
							damping: 17,
						},
					};
				default:
					return {};
			}
		};

		if (props.asChild) {
			// When using asChild, we need to apply motion directly to the child element
			return (
				<Slot
					ref={ref}
					className={cn(getVariant(), "relative overflow-hidden", className)}
				>
					<motion.div {...getAnimation()}>{children}</motion.div>
				</Slot>
			);
		}

		return (
			<motion.div {...getAnimation()} className="inline-block">
				<Button
					ref={ref}
					variant={
						variant === "gradient" || variant === "glow" ? "default" : variant
					}
					className={cn(getVariant(), "relative overflow-hidden", className)}
					{...props}
				>
					{animation === "ripple" && (
						<motion.div
							className="absolute inset-0 bg-white/20 rounded-full scale-0"
							whileTap={{
								scale: 4,
								opacity: [0.5, 0],
								transition: { duration: 0.6 },
							}}
						/>
					)}
					{children}
				</Button>
			</motion.div>
		);
	},
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
