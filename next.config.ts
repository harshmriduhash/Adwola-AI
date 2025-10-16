import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Performance optimizations
	compress: true,

	// Experimental features for better performance
	experimental: {
		// Optimize package imports to reduce bundle size
		optimizePackageImports: [
			"lucide-react",
			"@radix-ui/react-tabs",
			"@radix-ui/react-dialog",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-select",
			"@radix-ui/react-checkbox",
			"@radix-ui/react-label",
			"@radix-ui/react-progress",
			"@radix-ui/react-slot",
		],
	},

	// Image optimization
	images: {
		domains: [
			"supabase.co",
			"your-project.supabase.co", // Add your actual Supabase domain
			"openai.com",
			"oaidalleapiprodscus.blob.core.windows.net", // OpenAI DALL-E images
			"images.unsplash.com", // Unsplash images for testimonials
		],
		formats: ["image/webp", "image/avif"],
	},

	// PoweredByHeader removal for security
	poweredByHeader: false,
};

export default nextConfig;
