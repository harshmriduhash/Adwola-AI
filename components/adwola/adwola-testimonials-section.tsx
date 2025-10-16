"use client";

import { Star, Quote } from "lucide-react";

export function AdwolaTestimonialsSection() {
	const testimonials = [
		{
			quote: "Adwola transformed our content strategy completely. We went from spending 20 hours a week on social media to just 2 hours, while our engagement increased by 300%. The AI understands our brand voice perfectly!",
			author: "Sarah Chen",
			role: "Marketing Director",
			company: "TechFlow Inc",
			rating: 5,
			metric: "85% time savings achieved in 6 weeks",
			avatar: "/api/placeholder/64/64",
		},
		{
			quote: "We tried 3 different AI tools before Adwola. Nothing came close to the quality and ease of use. The ROI is incredible - it&apos;s like having a team of expert copywriters working 24/7. Our clients are amazed at the consistency and creativity.",
			author: "David Park",
			role: "Marketing Manager",
			company: "ScaleUp Industries",
			rating: 5,
			metric: "70% cost reduction achieved in 2 months",
			avatar: "/api/placeholder/64/64",
		},
		{
			quote: "Our agency manages 50+ client accounts. Adwola scaled our content production without hiring more staff. We can now serve 3x more clients with the same team size while maintaining quality standards.",
			author: "Lisa Thompson",
			role: "Digital Marketing Specialist",
			company: "BrandForce Agency",
			rating: 5,
			metric: "3x client capacity achieved in 4 months",
			avatar: "/api/placeholder/64/64",
		},
		{
			quote: "The AI content quality is outstanding. Adwola generates posts that sound like they came from our marketing team, not a robot. Our followers can&apos;t tell the difference, and our engagement rates are at an all-time high.",
			author: "Michael Rodriguez",
			role: "Social Media Manager",
			company: "GrowthCorp",
			rating: 5,
			metric: "150% engagement increase in 3 months",
			avatar: "/api/placeholder/64/64",
		},
		{
			quote: "Implementation was seamless. Within 24 hours, we were generating content for all our social platforms. The scheduling feature is a game-changer - our posts go live at optimal times automatically.",
			author: "Emma Wilson",
			role: "Content Director",
			company: "InnovateNow",
			rating: 5,
			metric: "40% more posts published weekly",
			avatar: "/api/placeholder/64/64",
		},
		{
			quote: "Adwola&apos;s analytics helped us understand what content works best. The insights are actionable and have directly contributed to our 200% follower growth. It&apos;s not just content creation - it&apos;s strategic guidance.",
			author: "James Kumar",
			role: "Growth Marketing Lead",
			company: "StartupSuccess",
			rating: 5,
			metric: "200% follower growth in 5 months",
			avatar: "/api/placeholder/64/64",
		},
	];

	const customerLogos = [
		"TechFlow Inc",
		"ScaleUp Industries", 
		"BrandForce Agency",
		"GrowthCorp",
		"InnovateNow",
		"StartupSuccess",
	];

	return (
		<section className="bg-gray-50 py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center">
					<div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
						Customer Success Stories
					</div>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Loved by people all over the universe
					</h2>
					<p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
						Don&apos;t take our word for it. Here&apos;s what our customers say about transforming 
						their content strategy with Adwola.
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg transition-shadow"
						>
							{/* Quote Icon */}
							<div className="absolute -top-3 left-8">
								<div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
									<Quote className="h-3 w-3 text-white" />
								</div>
							</div>

							{/* Stars */}
							<div className="flex items-center space-x-1">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								))}
							</div>

							{/* Quote */}
							<blockquote className="mt-4 text-gray-600">
								&ldquo;{testimonial.quote}&rdquo;
							</blockquote>

							{/* Metric */}
							<div className="mt-4 rounded-lg bg-green-50 p-3">
								<div className="text-sm font-medium text-green-800">
									{testimonial.metric}
								</div>
							</div>

							{/* Author */}
							<div className="mt-6 flex items-center">
								<div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
									<span className="text-sm font-medium text-gray-700">
										{testimonial.author.split(' ').map(n => n[0]).join('')}
									</span>
								</div>
								<div className="ml-4">
									<div className="text-sm font-medium text-gray-900">
										{testimonial.author}
									</div>
									<div className="text-sm text-gray-600">
										{testimonial.role}, {testimonial.company}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Customer Logos */}
				<div className="mt-16">
					<p className="text-center text-sm font-medium text-gray-500 mb-8">
						Trusted by companies across industries
					</p>
					<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
						{customerLogos.map((company, index) => (
							<div
								key={index}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<span className="text-sm font-medium">{company}</span>
							</div>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 text-center">
					<h3 className="text-2xl font-bold text-gray-900">
						Ready to join them?
					</h3>
					<p className="mt-2 text-gray-600">
						Start creating amazing content with Adwola today
					</p>
					<div className="mt-6">
						<button className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors">
							Start Your Free Trial
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}