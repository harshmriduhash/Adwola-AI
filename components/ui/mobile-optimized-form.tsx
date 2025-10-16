"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Eye, EyeOff, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBreakpoint, useViewportHeight } from "@/hooks/use-responsive";
import { cn } from "@/lib/utils";

interface FormFieldProps {
	id: string;
	label: string;
	type?: "text" | "email" | "password" | "textarea" | "tel" | "url";
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	autoComplete?: string;
	maxLength?: number;
	rows?: number;
	className?: string;
}

export function MobileOptimizedFormField({
	id,
	label,
	type = "text",
	placeholder,
	value,
	onChange,
	error,
	required = false,
	disabled = false,
	autoComplete,
	maxLength,
	rows = 3,
	className,
}: FormFieldProps) {
	const [showPassword, setShowPassword] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const { isMobile } = useBreakpoint();

	const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const isPassword = type === "password";
	const inputType = isPassword && showPassword ? "text" : type;
	const hasValue = value.length > 0;
	const hasError = !!error;

	// Enhanced mobile input props
	const mobileProps = isMobile
		? {
				autoCapitalize: type === "email" ? "none" : "words",
				autoCorrect: type === "email" || type === "password" ? "off" : "on",
				spellCheck: type === "email" || type === "password" ? false : true,
				inputMode:
					type === "email"
						? ("email" as const)
						: type === "tel"
							? ("tel" as const)
							: type === "url"
								? ("url" as const)
								: ("text" as const),
			}
		: {};

	const inputClasses = cn(
		// Base styles
		"w-full rounded-lg border bg-background transition-all duration-200",
		"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",

		// Mobile optimizations
		isMobile && [
			"text-base", // Prevent zoom on iOS
			"min-h-[44px]", // Touch target size
			"px-4 py-3", // Better touch padding
		],

		// Desktop styles
		!isMobile && "h-10 px-3 py-2",

		// State styles
		hasError && "border-red-500 focus:ring-red-500",
		!hasError && "border-gray-300 dark:border-gray-600",

		// Floating label states
		isMobile && "pt-6 pb-2",

		className,
	);

	const labelClasses = cn(
		"absolute left-4 transition-all duration-200 pointer-events-none",
		"text-gray-500 dark:text-gray-400",

		// Floating label animation
		isFocused || hasValue
			? [
					"top-2 text-xs font-medium",
					hasError ? "text-red-500" : "text-blue-600 dark:text-blue-400",
				]
			: [isMobile ? "top-4 text-base" : "top-3 text-sm"],
	);

	const FieldWrapper = ({ children }: { children: React.ReactNode }) => (
		<div className={cn("space-y-2", isMobile && "space-y-3")}>
			<div className="relative">
				{children}

				{/* Floating Label */}
				<Label htmlFor={id} className={labelClasses}>
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</Label>

				{/* Password Toggle */}
				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className={cn(
							"absolute right-3 top-1/2 -translate-y-1/2",
							"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
							"transition-colors duration-200",
							isMobile && "p-2 -mr-2", // Larger touch target on mobile
						)}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				)}

				{/* Clear Button for Mobile */}
				{isMobile && hasValue && !isPassword && (
					<button
						type="button"
						onClick={() => onChange("")}
						className="absolute right-3 top-1/2 -translate-y-1/2 p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
						aria-label="Clear input"
					>
						<X size={16} />
					</button>
				)}

				{/* Success/Error Icons */}
				<AnimatePresence>
					{!isPassword && (hasError || (hasValue && !error)) && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className={cn(
								"absolute top-1/2 -translate-y-1/2",
								isPassword || (isMobile && hasValue) ? "right-12" : "right-3",
							)}
						>
							{hasError ? (
								<AlertCircle size={20} className="text-red-500" />
							) : (
								<CheckCircle size={20} className="text-green-500" />
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Character Count */}
			{maxLength && (
				<div className="flex justify-end">
					<span
						className={cn(
							"text-xs",
							value.length > maxLength * 0.9 ? "text-red-500" : "text-gray-400",
						)}
					>
						{value.length}/{maxLength}
					</span>
				</div>
			)}

			{/* Error Message */}
			<AnimatePresence>
				{hasError && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="text-sm text-red-500 flex items-center gap-2"
					>
						<AlertCircle size={16} />
						{error}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);

	if (type === "textarea") {
		return (
			<FieldWrapper>
				<Textarea
					ref={inputRef as React.RefObject<HTMLTextAreaElement>}
					id={id}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={isFocused ? placeholder : ""}
					disabled={disabled}
					required={required}
					maxLength={maxLength}
					rows={rows}
					autoComplete={autoComplete}
					className={cn(inputClasses, "resize-none")}
					{...mobileProps}
				/>
			</FieldWrapper>
		);
	}

	return (
		<FieldWrapper>
			<Input
				ref={inputRef as React.RefObject<HTMLInputElement>}
				id={id}
				type={inputType}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={isFocused ? placeholder : ""}
				disabled={disabled}
				required={required}
				maxLength={maxLength}
				autoComplete={autoComplete}
				className={inputClasses}
				{...mobileProps}
			/>
		</FieldWrapper>
	);
}

interface MobileOptimizedFormProps {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent) => void;
	className?: string;
	stickyFooter?: boolean;
}

export function MobileOptimizedForm({
	children,
	onSubmit,
	className,
	stickyFooter = false,
}: MobileOptimizedFormProps) {
	const { isMobile } = useBreakpoint();
	const viewportHeight = useViewportHeight();

	return (
		<form
			onSubmit={onSubmit}
			className={cn(
				"space-y-6",
				isMobile && [
					"pb-safe", // Add safe area padding
					stickyFooter && "pb-20", // Extra padding for sticky footer
				],
				className,
			)}
			style={{
				minHeight: isMobile ? `${viewportHeight}px` : "auto",
			}}
		>
			{children}
		</form>
	);
}

interface StickyFormFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function StickyFormFooter({
	children,
	className,
}: StickyFormFooterProps) {
	const { isMobile } = useBreakpoint();

	if (!isMobile) {
		return <div className={className}>{children}</div>;
	}

	return (
		<div
			className={cn(
				"fixed bottom-0 left-0 right-0 z-40",
				"bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800",
				"p-4 pb-safe", // Safe area padding
				"shadow-lg",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface FormActionsProps {
	submitLabel?: string;
	cancelLabel?: string;
	onCancel?: () => void;
	isSubmitting?: boolean;
	submitDisabled?: boolean;
	className?: string;
}

export function MobileFormActions({
	submitLabel = "Submit",
	cancelLabel = "Cancel",
	onCancel,
	isSubmitting = false,
	submitDisabled = false,
	className,
}: FormActionsProps) {
	const { isMobile } = useBreakpoint();

	return (
		<div
			className={cn(
				"flex gap-3",
				isMobile ? "flex-col-reverse" : "flex-row justify-end",
				className,
			)}
		>
			{onCancel && (
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isSubmitting}
					className={cn(
						isMobile && "w-full h-12", // Full width and larger height on mobile
					)}
				>
					{cancelLabel}
				</Button>
			)}
			<Button
				type="submit"
				disabled={submitDisabled || isSubmitting}
				className={cn(
					isMobile && "w-full h-12", // Full width and larger height on mobile
				)}
			>
				{isSubmitting ? "Loading..." : submitLabel}
			</Button>
		</div>
	);
}
