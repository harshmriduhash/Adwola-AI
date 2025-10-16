import type { Metadata } from "next";

import { AdwolaCTASection } from "@/components/adwola/adwola-cta-section";
import { AdwolaFeaturesSection } from "@/components/adwola/adwola-features-section";
import { AdwolaHeader } from "@/components/adwola/adwola-header";
import { AdwolaHeroSection } from "@/components/adwola/adwola-hero-section";
import { AdwolaStatsSection } from "@/components/adwola/adwola-stats-section";
import { AdwolaTestimonialsSection } from "@/components/adwola/adwola-testimonials-section";
import { AdwolaFooter } from "@/components/enhanced-landing/AdwolaFooter";

export const metadata: Metadata = {
	title: "Adwola - AI-Powered Social Media Content Creation | Save 95% Time",
	description:
		"Transform your social media strategy with Adwola. Create professional content campaigns in minutes, not hours. Trusted by 1200+ brands worldwide. Free trial available.",
	keywords: [
		"Adwola",
		"AI content creation",
		"social media marketing",
		"content automation",
		"social media tools",
		"AI copywriting",
	],
	openGraph: {
		title: "Adwola - AI-Powered Social Media Content Creation",
		description:
			"Create professional social media content in minutes with AI. Save 95% time on content creation with Adwola.",
		images: [
			{
				url: "/og-image-adwola.jpg",
				width: 1200,
				height: 630,
				alt: "Adwola - AI Content Creation Platform",
			},
		],
		type: "website",
		locale: "en_US",
		siteName: "Adwola",
	},
	twitter: {
		card: "summary_large_image",
		title: "Adwola - AI-Powered Social Media Content Creation",
		description: "Create professional social media content in minutes with Adwola AI",
		images: ["/og-image-adwola.jpg"],
	},
	alternates: {
		canonical: "https://adwola.com",
	},
};



export default function Home() {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<AdwolaHeader />

			{/* Hero Section */}
			<AdwolaHeroSection />

			{/* Stats & Trusted Companies */}
			<AdwolaStatsSection />

			{/* Features Showcase */}
			<AdwolaFeaturesSection />

			{/* Testimonials */}
			<AdwolaTestimonialsSection />

			{/* Final CTA Section */}
			<AdwolaCTASection />

			{/* Footer */}
			<AdwolaFooter variant="full" showNewsletter={true} />
		</div>
	);
}
