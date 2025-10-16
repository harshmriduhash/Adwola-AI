"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
	children: React.ReactNode;
	direction?: "up" | "down" | "left" | "right" | "fade";
	delay?: number;
	duration?: number;
	distance?: number;
	className?: string;
	once?: boolean;
}

export function ScrollReveal({
	children,
	direction = "up",
	delay = 0,
	duration = 0.6,
	distance = 50,
	className = "",
	once = true,
}: ScrollRevealProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once, margin: "-10%" });

	const getInitialPosition = () => {
		switch (direction) {
			case "up":
				return { y: distance, opacity: 0 };
			case "down":
				return { y: -distance, opacity: 0 };
			case "left":
				return { x: distance, opacity: 0 };
			case "right":
				return { x: -distance, opacity: 0 };
			case "fade":
				return { opacity: 0 };
			default:
				return { y: distance, opacity: 0 };
		}
	};

	const getAnimatePosition = () => {
		switch (direction) {
			case "up":
			case "down":
				return { y: 0, opacity: 1 };
			case "left":
			case "right":
				return { x: 0, opacity: 1 };
			case "fade":
				return { opacity: 1 };
			default:
				return { y: 0, opacity: 1 };
		}
	};

	return (
		<motion.div
			ref={ref}
			initial={getInitialPosition()}
			animate={isInView ? getAnimatePosition() : getInitialPosition()}
			transition={{
				duration,
				delay,
				ease: "easeOut",
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

interface StaggerContainerProps {
	children: React.ReactNode;
	staggerDelay?: number;
	className?: string;
}

export function StaggerContainer({
	children,
	staggerDelay = 0.1,
	className = "",
}: StaggerContainerProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-10%" });

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: staggerDelay,
					},
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({
	children,
	className = "",
	direction = "up",
	distance = 50,
}: {
	children: React.ReactNode;
	className?: string;
	direction?: "up" | "down" | "left" | "right" | "fade";
	distance?: number;
}) {
	const getVariants = () => {
		switch (direction) {
			case "up":
				return {
					hidden: { y: distance, opacity: 0 },
					visible: { y: 0, opacity: 1 },
				};
			case "down":
				return {
					hidden: { y: -distance, opacity: 0 },
					visible: { y: 0, opacity: 1 },
				};
			case "left":
				return {
					hidden: { x: distance, opacity: 0 },
					visible: { x: 0, opacity: 1 },
				};
			case "right":
				return {
					hidden: { x: -distance, opacity: 0 },
					visible: { x: 0, opacity: 1 },
				};
			case "fade":
				return {
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
				};
			default:
				return {
					hidden: { y: distance, opacity: 0 },
					visible: { y: 0, opacity: 1 },
				};
		}
	};

	return (
		<motion.div
			variants={getVariants()}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
