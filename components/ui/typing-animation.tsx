"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypingAnimationProps {
	words: string[];
	className?: string;
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
	showCursor?: boolean;
	cursorClassName?: string;
	loop?: boolean;
}

export function TypingAnimation({
	words,
	className = "",
	typingSpeed = 100,
	deletingSpeed = 50,
	pauseDuration = 2000,
	showCursor = true,
	cursorClassName = "",
	loop = true,
}: TypingAnimationProps) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (words.length === 0) return;

		const currentWord = words[currentWordIndex];

		if (isPaused) {
			const pauseTimer = setTimeout(() => {
				setIsPaused(false);
				if (currentText === currentWord && loop) {
					setIsDeleting(true);
				}
			}, pauseDuration);

			return () => clearTimeout(pauseTimer);
		}

		const timer = setTimeout(
			() => {
				if (!isDeleting) {
					// Typing
					if (currentText.length < currentWord.length) {
						setCurrentText(currentWord.slice(0, currentText.length + 1));
					} else {
						setIsPaused(true);
					}
				} else {
					// Deleting
					if (currentText.length > 0) {
						setCurrentText(currentWord.slice(0, currentText.length - 1));
					} else {
						setIsDeleting(false);
						setCurrentWordIndex((prev) =>
							loop
								? (prev + 1) % words.length
								: Math.min(prev + 1, words.length - 1),
						);
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed,
		);

		return () => clearTimeout(timer);
	}, [
		currentText,
		currentWordIndex,
		isDeleting,
		isPaused,
		words,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
		loop,
	]);

	return (
		<span className={className}>
			{currentText}
			{showCursor && (
				<motion.span
					className={`inline-block ${cursorClassName}`}
					animate={{ opacity: [1, 0] }}
					transition={{
						duration: 0.8,
						repeat: Infinity,
						repeatType: "reverse",
					}}
				>
					|
				</motion.span>
			)}
		</span>
	);
}

interface CountingAnimationProps {
	from: number;
	to: number;
	duration?: number;
	className?: string;
	suffix?: string;
	prefix?: string;
}

export function CountingAnimation({
	from,
	to,
	duration = 2,
	className = "",
	suffix = "",
	prefix = "",
}: CountingAnimationProps) {
	const [count, setCount] = useState(from);

	useEffect(() => {
		const increment = (to - from) / (duration * 60); // 60fps
		const timer = setInterval(() => {
			setCount((prev) => {
				const next = prev + increment;
				if ((increment > 0 && next >= to) || (increment < 0 && next <= to)) {
					clearInterval(timer);
					return to;
				}
				return next;
			});
		}, 1000 / 60);

		return () => clearInterval(timer);
	}, [from, to, duration]);

	return (
		<span className={className}>
			{prefix}
			{Math.floor(count)}
			{suffix}
		</span>
	);
}

interface TextRevealProps {
	text: string;
	className?: string;
	delay?: number;
	staggerDelay?: number;
}

export function TextReveal({
	text,
	className = "",
	delay = 0,
	staggerDelay = 0.05,
}: TextRevealProps) {
	const words = text.split(" ");

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: {
					transition: {
						delayChildren: delay,
						staggerChildren: staggerDelay,
					},
				},
			}}
			className={className}
		>
			{words.map((word, index) => (
				<motion.span
					key={index}
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="inline-block mr-2"
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
}

interface LetterRevealProps {
	text: string;
	className?: string;
	delay?: number;
	staggerDelay?: number;
}

export function LetterReveal({
	text,
	className = "",
	delay = 0,
	staggerDelay = 0.03,
}: LetterRevealProps) {
	const letters = text.split("");

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: {
					transition: {
						delayChildren: delay,
						staggerChildren: staggerDelay,
					},
				},
			}}
			className={className}
		>
			{letters.map((letter, index) => (
				<motion.span
					key={index}
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="inline-block"
				>
					{letter === " " ? "\u00A0" : letter}
				</motion.span>
			))}
		</motion.div>
	);
}
