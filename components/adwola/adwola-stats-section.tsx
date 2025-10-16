"use client";

import { Star, Users, Clock, Shield } from "lucide-react";

export function AdwolaStatsSection() {
	const stats = [
		{
			number: "95%",
			label: "Time Saved",
			sublabel: "Average time reduction in content creation",
			icon: Clock,
			color: "text-blue-600",
		},
		{
			number: "4.9/5",
			label: "Customer Rating",
			sublabel: "Based on 500+ verified reviews",
			icon: Star,
			color: "text-yellow-500",
		},
		{
			number: "99.9%",
			label: "Uptime",
			sublabel: "Enterprise-grade reliability and performance",
			icon: Shield,
			color: "text-green-600",
		},
		{
			number: "1200+",
			label: "Happy Customers",
			sublabel: "Businesses trust Adwola for their content needs",
			icon: Users,
			color: "text-purple-600",
		},
	];

	const trustedCompanies = [
		{ name: "Netflix", logo: "NETFLIX" },
		{ name: "Google", logo: "Google" },
		{ name: "Meta", logo: "Meta" },
		{ name: "Microsoft", logo: "Microsoft" },
	];

	return (
		<section className="bg-gray-50 py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Trusted Companies */}
				<div className="text-center">
					<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
						Trusted by the best companies
					</h2>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
						{trustedCompanies.map((company, index) => (
							<div
								key={index}
								className="flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
							>
								<span className="text-xl font-bold">{company.logo}</span>
							</div>
						))}
					</div>
				</div>

				{/* Statistics Grid */}
				<div className="mt-16">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Proven Results That Speak
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Join thousands of businesses transforming their content strategy with Adwola
						</p>
					</div>

					<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{stats.map((stat, index) => {
							const IconComponent = stat.icon;
							return (
								<div
									key={index}
									className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg transition-shadow"
								>
									<div className="flex items-center">
										<div className={`rounded-lg p-3 ${stat.color} bg-opacity-10`}>
											<IconComponent className={`h-6 w-6 ${stat.color}`} />
										</div>
									</div>
									<div className="mt-4">
										<div className="text-3xl font-bold text-gray-900">
											{stat.number}
										</div>
										<div className="mt-1 text-lg font-medium text-gray-900">
											{stat.label}
										</div>
										<div className="mt-2 text-sm text-gray-600">
											{stat.sublabel}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}