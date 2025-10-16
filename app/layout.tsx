import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-inter",
});

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Adwola - AI-Powered Social Media Content Creation",
	description:
		"Transform ideas into viral content with AI power. Create engaging posts across all platforms in seconds, not hours. Trusted by 10,000+ creators worldwide.",
	keywords:
		"AI content generation, social media marketing, content creation, artificial intelligence, social media automation, brand management",
	authors: [
		{ name: "Sayem Abdullah Rihan", url: "https://github.com/code-craka" },
	],
	openGraph: {
		title: "Adwola - AI-Powered Social Media Content Creation",
		description:
			"Transform ideas into viral content with AI power. Create engaging posts across all platforms in seconds, not hours.",
		type: "website",
		locale: "en_US",
		siteName: "Adwola",
	},
	twitter: {
		card: "summary_large_image",
		title: "Adwola - AI-Powered Social Media Content Creation",
		description:
			"Transform ideas into viral content with AI power. Create engaging posts across all platforms in seconds, not hours.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.variable} suppressHydrationWarning>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<meta name="theme-color" content="#667eea" />
			</head>
			<body
				className={`${inter.className} bg-background text-foreground antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position="top-right" richColors closeButton />
				</ThemeProvider>
			</body>
		</html>
	);
}
