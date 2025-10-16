"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function AdwolaCTASection() {
	const benefits = [
		"No credit card required",
		"5 free posts to get started",
		"Cancel anytime",
		"Setup in under 5 minutes"
	];

	return (
		<section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					{/* Headline */}
					<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Ready to signup and join the waitlist?
					</h2>
					<p className="mt-4 text-lg text-blue-100">
						Transform your content strategy today with Adwola&apos;s AI-powered platform. 
						Join thousands of businesses already creating amazing content.
					</p>

					{/* Benefits */}
					<div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8">
						{benefits.map((benefit, index) => (
							<div key={index} className="flex items-center text-blue-100">
								<CheckCircle className="h-5 w-5 text-green-400 mr-2" />
								<span className="text-sm">{benefit}</span>
							</div>
						))}
					</div>

					{/* CTA Button */}
					<div className="mt-10">
						<Button 
							size="lg" 
							className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
						>
							Get Started
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</div>

					{/* Trust Signal */}
					<p className="mt-6 text-sm text-blue-200">
						Join 1200+ businesses already using Adwola to scale their content strategy
					</p>
				</div>
			</div>
		</section>
	);
}