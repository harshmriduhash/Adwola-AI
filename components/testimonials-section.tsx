"use client";

import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	ScrollReveal,
	StaggerContainer,
	StaggerItem,
} from "@/components/ui/scroll-reveal";

const testimonials = [
	{
		id: 1,
		name: "Sarah Chen",
		title: "Marketing Director",
		company: "TechFlow Solutions",
		avatar: "/avatars/sarah.jpg",
		rating: 5,
		quote:
			"AmplifyAI transformed our content strategy completely. We went from spending 20 hours a week on social media to just 2 hours, while our engagement increased by 300%. The AI understands our brand voice perfectly.",
		results: "300% engagement increase",
		timeframe: "First month",
		featured: true,
	},
	{
		id: 2,
		name: "Marcus Rodriguez",
		title: "Founder & CEO",
		company: "GrowthCorp",
		avatar: "/avatars/marcus.jpg",
		rating: 5,
		quote:
			"As a small business owner, I was drowning in content creation. AmplifyAI gave me my time back and our social media actually looks professional now. Our follower count doubled in 3 months.",
		results: "100% follower growth",
		timeframe: "3 months",
		featured: false,
	},
	{
		id: 3,
		name: "Emily Watson",
		title: "Social Media Manager",
		company: "InnovateLab",
		avatar: "/avatars/emily.jpg",
		rating: 5,
		quote:
			"The quality of content AmplifyAI produces is incredible. It's like having a team of expert copywriters working 24/7. Our clients are amazed at the consistency and creativity.",
		results: "85% time savings",
		timeframe: "6 weeks",
		featured: false,
	},
	{
		id: 4,
		name: "David Park",
		title: "Marketing Manager",
		company: "ScaleUp Industries",
		avatar: "/avatars/david.jpg",
		rating: 5,
		quote:
			"We tried 3 different AI tools before AmplifyAI. Nothing came close to the quality and ease of use. The ROI is incredible - we cut our content costs by 70% while improving quality.",
		results: "70% cost reduction",
		timeframe: "2 months",
		featured: false,
	},
	{
		id: 5,
		name: "Lisa Thompson",
		title: "Digital Marketing Specialist",
		company: "BrandForce Agency",
		avatar: "/avatars/lisa.jpg",
		rating: 5,
		quote:
			"Our agency manages 50+ client accounts. AmplifyAI scaled our content production without hiring more staff. We can now serve 3x more clients with the same team size.",
		results: "3x client capacity",
		timeframe: "4 months",
		featured: false,
	},
	{
		id: 6,
		name: "James Wilson",
		title: "E-commerce Director",
		company: "RetailPro",
		avatar: "/avatars/james.jpg",
		rating: 5,
		quote:
			"Product launches used to take weeks of content planning. Now we can create a full campaign in 30 minutes. Our conversion rates from social media improved by 150%.",
		results: "150% conversion boost",
		timeframe: "5 weeks",
		featured: false,
	},
];

const VideoTestimonial = () => (
	<ScrollReveal direction="up" delay={0.4}>
		<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
			<div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
				{/* Video placeholder */}
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.button
						className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
					</motion.button>
				</div>
				<div className="absolute bottom-4 left-4 text-white">
					<p className="font-semibold">Watch Sarah&apos;s Story</p>
					<p className="text-sm opacity-90">
						How TechFlow 10x&apos;d their content output
					</p>
				</div>
			</div>
			<div className="p-6">
				<div className="flex items-center space-x-4">
					<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
						<User className="w-6 h-6 text-white" />
					</div>
					<div>
						<h4 className="font-semibold">Sarah Chen</h4>
						<p className="text-sm text-muted-foreground">
							Marketing Director, TechFlow
						</p>
					</div>
				</div>
			</div>
		</div>
	</ScrollReveal>
);

export function TestimonialsSection() {
	const featuredTestimonial = testimonials.find((t) => t.featured);
	const regularTestimonials = testimonials.filter((t) => !t.featured);

	return (
		<section className="py-24 bg-white dark:bg-gray-900" id="testimonials">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-20">
					<ScrollReveal direction="up">
						<Badge
							variant="secondary"
							className="mb-6 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
						>
							<Star className="w-4 h-4 mr-2" />
							Customer Success Stories
						</Badge>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.2}>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Real results from{" "}
							<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
								real businesses
							</span>
						</h2>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Don&apos;t take our word for it. Here&apos;s what our customers
							say about transforming their content strategy with AmplifyAI.
						</p>
					</ScrollReveal>
				</div>

				{/* Featured Testimonial */}
				{featuredTestimonial && (
					<ScrollReveal direction="up" delay={0.6}>
						<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 md:p-12 rounded-3xl border border-blue-100 dark:border-blue-800 mb-20">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<div>
									<Quote className="w-12 h-12 text-blue-500 mb-6" />
									<blockquote className="text-2xl font-medium leading-relaxed mb-8">
										&quot;{featuredTestimonial.quote}&quot;
									</blockquote>

									<div className="flex items-center space-x-4 mb-6">
										<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
											<User className="w-8 h-8 text-white" />
										</div>
										<div>
											<h4 className="text-lg font-semibold">
												{featuredTestimonial.name}
											</h4>
											<p className="text-muted-foreground">
												{featuredTestimonial.title}
											</p>
											<p className="text-sm text-muted-foreground">
												{featuredTestimonial.company}
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-6">
										<div className="flex">
											{[...Array(featuredTestimonial.rating)].map((_, i) => (
												<Star
													key={i}
													className="w-5 h-5 text-yellow-400 fill-current"
												/>
											))}
										</div>
										<div className="text-sm">
											<span className="font-semibold text-green-600">
												{featuredTestimonial.results}
											</span>
											<span className="text-muted-foreground">
												{" "}
												in {featuredTestimonial.timeframe}
											</span>
										</div>
									</div>
								</div>

								<div>
									<VideoTestimonial />
								</div>
							</div>
						</div>
					</ScrollReveal>
				)}

				{/* Regular Testimonials Grid */}
				<StaggerContainer
					staggerDelay={0.1}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{regularTestimonials.map((testimonial) => (
						<StaggerItem key={testimonial.id}>
							<motion.div
								className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full group hover:shadow-xl transition-all duration-300"
								whileHover={{ y: -5 }}
							>
								<div className="flex items-center justify-between mb-6">
									<div className="flex">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 text-yellow-400 fill-current"
											/>
										))}
									</div>
									<Quote className="w-6 h-6 text-blue-500 opacity-50" />
								</div>

								<blockquote className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
									&quot;{testimonial.quote}&quot;
								</blockquote>

								<div className="mt-auto">
									<div className="flex items-center space-x-3 mb-4">
										<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
											<User className="w-6 h-6 text-white" />
										</div>
										<div>
											<h4 className="font-semibold text-sm">
												{testimonial.name}
											</h4>
											<p className="text-xs text-muted-foreground">
												{testimonial.title}
											</p>
											<p className="text-xs text-muted-foreground">
												{testimonial.company}
											</p>
										</div>
									</div>

									<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
										<div className="text-sm">
											<span className="font-semibold text-green-600">
												{testimonial.results}
											</span>
											<span className="text-muted-foreground">
												{" "}
												in {testimonial.timeframe}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						</StaggerItem>
					))}
				</StaggerContainer>

				{/* Bottom CTA */}
				<ScrollReveal direction="up" delay={0.8}>
					<div className="text-center mt-20">
						<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 max-w-2xl mx-auto">
							<h3 className="text-2xl font-bold mb-4">Ready to join them?</h3>
							<p className="text-muted-foreground mb-6">
								See why 1200+ businesses trust AmplifyAI for their content
								strategy
							</p>
							<div className="flex justify-center">
								<motion.button
									className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Start Your Success Story
								</motion.button>
							</div>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
