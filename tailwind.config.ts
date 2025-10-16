import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		// Aceternity UI color classes
		"bg-blue-500/20", "bg-purple-500/20", "bg-green-500/20", "bg-orange-500/20",
		"bg-pink-500/20", "bg-indigo-500/20", "bg-red-500/20", "bg-teal-500/20",
		"bg-cyan-500/20", "bg-emerald-500/20", "bg-gray-500/20",
		"text-blue-600", "text-purple-600", "text-green-600", "text-orange-600",
		"text-pink-600", "text-indigo-600", "text-red-600", "text-teal-600",
		"text-cyan-600", "text-emerald-600", "text-gray-600",
		"shadow-blue-500/20", "shadow-purple-500/20", "shadow-green-500/20",
		"shadow-orange-500/20", "shadow-pink-500/20", "shadow-indigo-500/20",
		"shadow-red-500/20", "shadow-teal-500/20", "shadow-cyan-500/20",
		"hover:text-blue-600", "hover:text-purple-600", "hover:text-green-600",
		"hover:text-orange-600", "hover:text-pink-600", "hover:text-indigo-600",
		"hover:text-red-600", "hover:text-teal-600", "hover:text-cyan-600",
		"dark:hover:text-blue-400", "dark:hover:text-purple-400", "dark:hover:text-green-400",
		"dark:hover:text-orange-400", "dark:hover:text-pink-400", "dark:hover:text-indigo-400",
		"dark:hover:text-red-400", "dark:hover:text-teal-400", "dark:hover:text-cyan-400",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
