import {
	AlertTriangle,
	Ban,
	Calendar,
	CheckCircle,
	Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function AcceptableUsePolicy() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Header */}
			<div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<ScrollReveal direction="up">
						<div className="text-center">
							<Badge
								variant="secondary"
								className="mb-4 bg-white/20 text-white border-white/30"
							>
								<Shield className="w-4 h-4 mr-2" />
								Acceptable Use Policy
							</Badge>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Acceptable Use Policy
							</h1>
							<p className="text-xl text-red-100 max-w-2xl mx-auto">
								Guidelines for responsible and lawful use of AmplifyAI
							</p>
							<div className="flex items-center justify-center mt-6 text-red-100">
								<Calendar className="w-5 h-5 mr-2" />
								<span>Last updated: December 28, 2024</span>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Quick Overview */}
				<ScrollReveal direction="up" delay={0.2}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
						<Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
							<CardContent className="p-6">
								<div className="flex items-start space-x-3">
									<CheckCircle className="w-6 h-6 text-green-600 mt-1" />
									<div>
										<h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
											Acceptable Use
										</h3>
										<p className="text-green-700 dark:text-green-300 text-sm">
											Creating legitimate business content, following platform
											guidelines, and respecting others&apos; rights.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
							<CardContent className="p-6">
								<div className="flex items-start space-x-3">
									<Ban className="w-6 h-6 text-red-600 mt-1" />
									<div>
										<h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
											Prohibited Use
										</h3>
										<p className="text-red-700 dark:text-red-300 text-sm">
											Illegal activities, harmful content, spam, harassment, or
											violating platform terms.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</ScrollReveal>

				{/* Policy Content */}
				<div className="space-y-8">
					<ScrollReveal direction="up" delay={0.3}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>1. Purpose and Scope</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										This Acceptable Use Policy (&quot;AUP&quot;) governs your
										use of AmplifyAI&apos;s services and defines what
										constitutes acceptable and unacceptable behavior on our
										platform.
									</p>
									<p>
										By using AmplifyAI, you agree to comply with this policy and
										all applicable laws and regulations. Violations may result
										in account suspension or termination.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>2. Acceptable Use</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>You may use AmplifyAI for:</p>
									<ul>
										<li>Creating legitimate business and marketing content</li>
										<li>Managing social media campaigns for lawful purposes</li>
										<li>Educational and research purposes</li>
										<li>Personal brand building and content creation</li>
										<li>Team collaboration on content projects</li>
										<li>Analyzing and improving content performance</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.5}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>3. Prohibited Activities</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>3.1 Illegal Activities</h4>
									<p>
										You must not use AmplifyAI for any illegal purposes,
										including:
									</p>
									<ul>
										<li>
											Violating any local, state, national, or international
											laws
										</li>
										<li>Promoting illegal activities or substances</li>
										<li>Money laundering or financial crimes</li>
										<li>Intellectual property infringement</li>
										<li>Identity theft or impersonation</li>
									</ul>

									<h4>3.2 Harmful Content</h4>
									<p>You must not create, share, or promote content that:</p>
									<ul>
										<li>Contains hate speech, discrimination, or harassment</li>
										<li>Promotes violence or terrorism</li>
										<li>
											Includes explicit sexual content or child exploitation
										</li>
										<li>Spreads misinformation or conspiracy theories</li>
										<li>Contains malware, viruses, or malicious code</li>
										<li>Violates others&apos; privacy or dignity</li>
									</ul>

									<h4>3.3 Spam and Abuse</h4>
									<p>You must not:</p>
									<ul>
										<li>Send spam or unsolicited communications</li>
										<li>Create fake accounts or use bots</li>
										<li>Engage in coordinated inauthentic behavior</li>
										<li>Manipulate engagement metrics artificially</li>
										<li>Overwhelm our systems with excessive requests</li>
									</ul>

									<h4>3.4 Platform Violations</h4>
									<p>You must not:</p>
									<ul>
										<li>Violate social media platform terms of service</li>
										<li>Use our service to circumvent platform restrictions</li>
										<li>Share login credentials or sell access</li>
										<li>Reverse engineer or attempt to hack our systems</li>
										<li>Use our service for competitive intelligence</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>4. Content Guidelines</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>4.1 Quality Standards</h4>
									<ul>
										<li>Ensure content is accurate and truthful</li>
										<li>Respect intellectual property rights</li>
										<li>Follow industry best practices</li>
										<li>Maintain professional standards</li>
									</ul>

									<h4>4.2 Platform-Specific Requirements</h4>
									<p>When posting to social media platforms, you must:</p>
									<ul>
										<li>Follow each platform&apos;s community guidelines</li>
										<li>
											Respect character limits and formatting requirements
										</li>
										<li>Use appropriate hashtags and mentions</li>
										<li>Comply with advertising and promotional policies</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.7}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>5. Enforcement and Consequences</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>5.1 Monitoring</h4>
									<p>
										We may monitor content and activities to ensure compliance
										with this policy. However, we do not pre-screen all content
										and are not responsible for user-generated content.
									</p>

									<h4>5.2 Violations</h4>
									<p>If you violate this policy, we may:</p>
									<ul>
										<li>Issue a warning or require corrective action</li>
										<li>Temporarily suspend your account</li>
										<li>Permanently terminate your account</li>
										<li>Remove or disable access to violating content</li>
										<li>Report illegal activities to authorities</li>
									</ul>

									<h4>5.3 Appeals Process</h4>
									<p>
										If you believe enforcement action was taken in error, you
										may appeal by contacting our support team with relevant
										details and evidence.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>6. Reporting Violations</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										If you encounter content or behavior that violates this
										policy, please report it to us:
									</p>
									<ul>
										<li>
											<strong>Email:</strong> abuse@amplifyai.com
										</li>
										<li>
											<strong>In-app reporting:</strong> Use the report feature
											in our platform
										</li>
										<li>
											<strong>Emergency issues:</strong> security@amplifyai.com
										</li>
									</ul>
									<p>
										Please provide as much detail as possible, including
										screenshots, URLs, and a description of the violation.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>
				</div>

				{/* Contact Information */}
				<ScrollReveal direction="up" delay={0.9}>
					<Card className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
						<CardHeader>
							<CardTitle className="flex items-center">
								<AlertTriangle className="w-5 h-5 mr-2" />
								Questions About This Policy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4">
								If you have questions about this Acceptable Use Policy or need
								clarification about specific use cases, please contact us:
							</p>
							<div className="space-y-2 text-sm">
								<p>
									<strong>General Questions:</strong> support@amplifyai.com
								</p>
								<p>
									<strong>Policy Violations:</strong> abuse@amplifyai.com
								</p>
								<p>
									<strong>Legal Inquiries:</strong> legal@amplifyai.com
								</p>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>
			</div>
		</div>
	);
}
