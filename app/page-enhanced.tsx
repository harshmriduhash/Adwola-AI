import type { Metadata } from "next";
import CompleteLandingPage from "@/components/enhanced-landing/CompleteLandingPage";

export const metadata: Metadata = {
	title: "Adwola - AI-Powered Social Media Content Creation | Transform Ideas into Viral Content",
	description:
		"Create VIRAL content with AI power in seconds, not hours. Transform ideas into engaging posts across all platforms. Trusted by 10,000+ creators worldwide. Start your free 14-day trial today.",
	keywords: [
		"Adwola",
		"AI content creation",
		"viral content",
		"social media marketing",
		"content automation",
		"AI copywriting",
		"dual AI",
		"OpenAI",
		"Vertex AI",
		"multi-platform content",
		"content optimization",
		"social media scheduler",
		"engagement boost",
		"content strategy",
		"AI writing assistant"
	],
	openGraph: {
		title: "Adwola - Create VIRAL Content with AI Power",
		description:
			"Transform ideas into engaging posts with AI in seconds. 250% average engagement boost. Trusted by 10,000+ creators. Start free trial.",
		images: [
			{
				url: "/og-image-adwola-enhanced.jpg",
				width: 1200,
				height: 630,
				alt: "Adwola - Create VIRAL Content with AI Power",
			},
		],
		type: "website",
		locale: "en_US",
		siteName: "Adwola",
	},
	twitter: {
		card: "summary_large_image",
		title: "Adwola - Create VIRAL Content with AI Power",
		description: "Transform ideas into engaging posts with AI in seconds. 250% engagement boost guaranteed.",
		images: ["/og-image-adwola-enhanced.jpg"],
		creator: "@AdwolaAI",
	},
	alternates: {
		canonical: "https://adwola.com",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: "google-site-verification-code",
		yandex: "yandex-verification-code",
		yahoo: "yahoo-site-verification-code",
	},
	category: "Technology",
	other: {
		'theme-color': '#667eea',
		'msapplication-TileColor': '#667eea',
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'default',
		'format-detection': 'telephone=no',
	},
};

export default function EnhancedHome() {
	return <CompleteLandingPage />;
}