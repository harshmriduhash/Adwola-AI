"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, User, Play, ChevronLeft, ChevronRight, Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const testimonials = [
	{
		id: 1,
		name: "Sarah Chen",
		title: "Marketing Director",
		company: "TechFlow Solutions",
		companyLogo: "🚀",
		industry: "Technology",
		avatar: "/avatars/sarah.jpg",
		rating: 5,
		quote:
			"AmplifyAI transformed our content strategy completely. We went from spending 20 hours a week on social media to just 2 hours, while our engagement increased by 300%. The AI understands our brand voice perfectly.",
		results: "300% engagement increase",
		timeframe: "First month",
		featured: true,
		color: "blue",
	},
	{
		id: 2,
		name: "Marcus Rodriguez",
		title: "Founder & CEO",
		company: "GrowthCorp",
		companyLogo: "💼",
		industry: "Business Services",
		avatar: "/avatars/marcus.jpg",
		rating: 5,
		quote:
			"As a small business owner, I was drowning in content creation. AmplifyAI gave me my time back and our social media actually looks professional now. Our follower count doubled in 3 months.",
		results: "100% follower growth",
		timeframe: "3 months",
		featured: false,
		color: "purple",
	},
	{
		id: 3,
		name: "Emily Watson",
		title: "Social Media Manager",
		company: "InnovateLab",
		companyLogo: "🔬",
		industry: "Research & Development",
		avatar: "/avatars/emily.jpg",
		rating: 5,
		quote:
			"The quality of content AmplifyAI produces is incredible. It's like having a team of expert copywriters working 24/7. Our clients are amazed at the consistency and creativity.",
		results: "85% time savings",
		timeframe: "6 weeks",
		featured: false,
		color: "green",
	},
	{
		id: 4,
		name: "David Park",
		title: "Marketing Manager",
		company: "ScaleUp Industries",
		companyLogo: "📈",
		industry: "Manufacturing",
		avatar: "/avatars/david.jpg",
		rating: 5,
		quote:
			"We tried 3 different AI tools before AmplifyAI. Nothing came close to the quality and ease of use. The ROI is incredible - we cut our content costs by 70% while improving quality.",
		results: "70% cost reduction",
		timeframe: "2 months",
		featured: false,
		color: "orange",
	},
	{
		id: 5,
		name: "Lisa Thompson",
		title: "Digital Marketing Specialist",
		company: "BrandForce Agency",
		companyLogo: "🎨",
		industry: "Marketing Agency",
		avatar: "/avatars/lisa.jpg",
		rating: 5,
		quote:
			"Our agency manages 50+ client accounts. AmplifyAI scaled our content production without hiring more staff. We can now serve 3x more clients with the same team size.",
		results: "3x client capacity",
		timeframe: "4 months",
		featured: false,
		color: "indigo",
	},
	{
		id: 6,
		name: "James Wilson",
		title: "E-commerce Director",
		company: "RetailPro",
		companyLogo: "🛍️",
		industry: "E-commerce",
		avatar: "/avatars/james.jpg",
		rating: 5,
		quote:
			"Product launches used to take weeks of content planning. Now we can create a full campaign in 30 minutes. Our conversion rates from social media improved by 150%.",
		results: "150% conversion boost",
		timeframe: "5 weeks",
		featured: false,
		color: "pink",
	},
];

// Enhanced Video Testimonial Component
function VideoTestimonial({ testimonial }: { testimonial: typeof testimonials[0] }) {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<motion.div
			className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.3 }}
		>
			<div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-black/20" />
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30" />
				
				{/* Video Overlay */}
				<AnimatePresence>
					{!isPlaying && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<motion.button
								className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group"
								whileHover={{ 
									scale: 1.1,
									boxShadow: "0 0 30px rgba(255,255,255,0.3)"
								}}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsPlaying(true)}
							>
								<Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Video Info */}
				<div className="absolute bottom-4 left-4 text-white">
					<motion.p 
						className="font-semibold text-lg"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						Watch {testimonial.name}&apos;s Story
					</motion.p>
					<motion.p 
						className="text-sm opacity-90"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						How {testimonial.company} achieved {testimonial.results}
					</motion.p>
				</div>

				{/* Company Logo Badge */}
				<motion.div
					className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<span className="text-2xl">{testimonial.companyLogo}</span>
				</motion.div>
			</div>

			{/* Profile Section */}
			<div className="p-6">
				<div className="flex items-center space-x-4">
					<motion.div
						className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
						whileHover={{ scale: 1.1, rotate: 5 }}
					>
						<User className="w-7 h-7 text-white" />
					</motion.div>
					<div>
						<h4 className="font-semibold text-lg">{testimonial.name}</h4>
						<p className="text-muted-foreground">
							{testimonial.title}
						</p>
						<div className="flex items-center space-x-2 mt-1">
							<Building2 className="w-3 h-3 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">
								{testimonial.company}
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

// Enhanced Testimonial Card Component
function TestimonialCard({ testimonial, isActive }: { 
	testimonial: typeof testimonials[0]; 
	isActive: boolean; 
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const getColorClasses = (color: string) => {
		const colors = {
			blue: "from-blue-500 to-indigo-600",
			purple: "from-purple-500 to-pink-600",
			green: "from-green-500 to-emerald-600",
			orange: "from-orange-500 to-red-600",
			indigo: "from-indigo-500 to-blue-600",
			pink: "from-pink-500 to-rose-600",
		};
		return colors[color as keyof typeof colors] || colors.blue;
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
			transition={{ duration: 0.6, ease: "easeOut" }}
			whileHover={{ 
				y: -8, 
				scale: 1.02,
				transition: { duration: 0.3 }
			}}
			className={cn(
				"relative p-8 rounded-3xl border transition-all duration-500 h-full group",
				"bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg",
				"border-white/20 dark:border-gray-700/30",
				"shadow-lg hover:shadow-2xl",
				isActive && "ring-2 ring-blue-500/20 shadow-2xl"
			)}
		>
			{/* Background Gradient */}
			<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			
			{/* Glow Effect */}
			<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Content */}
			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-2">
						{[...Array(testimonial.rating)].map((_, i) => (
							<motion.div
								key={i}
								initial={{ scale: 0, rotate: -180 }}
								animate={isInView ? { scale: 1, rotate: 0 } : {}}
								transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
							>
								<Star className="w-5 h-5 text-yellow-400 fill-current" />
							</motion.div>
						))}
					</div>
					
					{/* Company Logo */}
					<motion.div
						className="w-10 h-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border border-white/30 dark:border-gray-600/30 group-hover:scale-110 transition-transform duration-300"
						whileHover={{ rotate: [0, -5, 5, 0] }}
						transition={{ duration: 0.5 }}
					>
						<span className="text-lg">{testimonial.companyLogo}</span>
					</motion.div>
				</div>

				{/* Quote */}
				<div className="mb-6">
					<Quote className="w-8 h-8 text-blue-500 mb-4 opacity-70" />
					<blockquote className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
						&quot;{testimonial.quote}&quot;
					</blockquote>
				</div>

				{/* Profile */}
				<div className="mb-6">
					<div className="flex items-center space-x-4">
						<motion.div
							className={cn(
								"w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
								`bg-gradient-to-r ${getColorClasses(testimonial.color)} text-white`
							)}
							whileHover={{ scale: 1.1, rotate: 5 }}
						>
							<User className="w-7 h-7" />
						</motion.div>
						<div>
							<h4 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								{testimonial.name}
							</h4>
							<p className="text-muted-foreground">
								{testimonial.title}
							</p>
							<div className="flex items-center space-x-2 mt-1">
								<Building2 className="w-3 h-3 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">
									{testimonial.company}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Results Badge */}
				<motion.div
					className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-800"
					whileHover={{ scale: 1.02 }}
				>
					<div className="text-sm">
						<span className="font-bold text-green-600 dark:text-green-400 text-lg">
							{testimonial.results}
						</span>
						<span className="text-muted-foreground block mt-1">
							achieved in {testimonial.timeframe}
						</span>
						<span className="text-xs text-muted-foreground">
							{testimonial.industry}
						</span>
					</div>
				</motion.div>

				{/* Hover Border Effect */}
				<div className={cn(
					"absolute bottom-0 left-8 right-8 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500",
					`bg-gradient-to-r ${getColorClasses(testimonial.color)}`
				)} />
			</div>
		</motion.div>
	);
}

export function AnimatedTestimonialsCarousel() {
	const [isClient, setIsClient] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const headerRef = useRef(null);
	const isHeaderInView = useInView(headerRef, { once: true });

	const featuredTestimonial = testimonials.find((t) => t.featured) || testimonials[0];
	const carouselTestimonials = testimonials.filter((t) => !t.featured);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Auto-play carousel
	useEffect(() => {
		if (!isAutoPlaying || !isClient) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, carouselTestimonials.length, isClient]);

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
		setIsAutoPlaying(false);
	};

	const prevTestimonial = () => {
		setCurrentIndex((prev) => (prev - 1 + carouselTestimonials.length) % carouselTestimonials.length);
		setIsAutoPlaying(false);
	};

	if (!isClient) {
		return (
			<section className="py-24 bg-white dark:bg-gray-900" id="testimonials">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20">
						<Badge variant="secondary" className="mb-6 px-4 py-2">
							<Star className="w-4 h-4 mr-2" />
							Customer Success Stories
						</Badge>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Real results from real businesses
						</h2>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
						<div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
						<div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden" id="testimonials">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50 bg-[size:32px_32px] opacity-20" />
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				{/* Header */}
				<div ref={headerRef} className="text-center mb-20">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6 }}
					>
						<Badge
							variant="secondary"
							className="mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30"
						>
							<Star className="w-4 h-4 mr-2" />
							Customer Success Stories
						</Badge>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-4xl md:text-5xl font-bold mb-6"
					>
						Real results from{" "}
						<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
							real businesses
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-xl text-muted-foreground max-w-3xl mx-auto"
					>
						Don&apos;t take our word for it. Here&apos;s what our customers
						say about transforming their content strategy with AmplifyAI.
					</motion.p>
				</div>

				{/* Featured Testimonial */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
				>
					<TestimonialCard testimonial={featuredTestimonial} isActive={true} />
					<VideoTestimonial testimonial={featuredTestimonial} />
				</motion.div>

				{/* Carousel Section */}
				<div className="relative">
					{/* Carousel Header */}
					<div className="flex items-center justify-between mb-8">
						<h3 className="text-2xl font-bold">More Success Stories</h3>
						<div className="flex items-center space-x-2" role="group" aria-label="Testimonial carousel controls">
							<motion.button
								onClick={prevTestimonial}
								className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								aria-label="Previous testimonial"
								title="Previous testimonial"
							>
								<ChevronLeft className="w-5 h-5" aria-hidden="true" />
							</motion.button>
							<motion.button
								onClick={nextTestimonial}
								className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								aria-label="Next testimonial"
								title="Next testimonial"
							>
								<ChevronRight className="w-5 h-5" aria-hidden="true" />
							</motion.button>
						</div>
					</div>

					{/* Carousel */}
					<div 
						className="relative overflow-hidden"
						role="region"
						aria-label="Customer testimonials carousel"
					>
						<motion.div
							className="flex transition-transform duration-500 ease-in-out"
							style={{
								transform: `translateX(-${currentIndex * (100 / 3)}%)`,
							}}
							role="group"
							aria-live="polite"
							aria-label={`Testimonial ${currentIndex + 1} of ${carouselTestimonials.length}`}
						>
							{carouselTestimonials.map((testimonial, index) => (
								<div
									key={testimonial.id}
									className="w-1/3 flex-shrink-0 px-4"
									role="tabpanel"
									aria-label={`Testimonial from ${testimonial.name}, ${testimonial.title} at ${testimonial.company}`}
								>
									<TestimonialCard 
										testimonial={testimonial} 
										isActive={index === currentIndex}
									/>
								</div>
							))}
						</motion.div>
					</div>

					{/* Carousel Indicators */}
					<div 
						className="flex justify-center space-x-2 mt-8"
						role="tablist"
						aria-label="Testimonial navigation"
					>
						{carouselTestimonials.map((testimonial, index) => (
							<motion.button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={cn(
									"w-3 h-3 rounded-full transition-all duration-300",
									index === currentIndex
										? "bg-blue-500 scale-125"
										: "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
								)}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
								role="tab"
								aria-selected={index === currentIndex}
								aria-label={`Go to testimonial from ${testimonial.name}`}
								title={`Testimonial from ${testimonial.name}`}
							/>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-20"
				>
					<div className={cn(
						"bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-3xl",
						"border border-white/20 dark:border-gray-700/30 shadow-lg",
						"max-w-2xl mx-auto"
					)}>
						<h3 className="text-2xl font-bold mb-4">Ready to join them?</h3>
						<p className="text-muted-foreground mb-6">
							See why 1200+ businesses trust AmplifyAI for their content strategy
						</p>
						<motion.button
							className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
							whileHover={{ 
								scale: 1.05,
								boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
							}}
							whileTap={{ scale: 0.95 }}
						>
							Start Your Success Story
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}