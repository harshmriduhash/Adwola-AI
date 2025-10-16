import { AlertTriangle, Calendar, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function TermsOfService() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<ScrollReveal direction="up">
						<div className="text-center">
							<Badge
								variant="secondary"
								className="mb-4 bg-white/20 text-white border-white/30"
							>
								<FileText className="w-4 h-4 mr-2" />
								Legal Document
							</Badge>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Terms of Service
							</h1>
							<p className="text-xl text-blue-100 max-w-2xl mx-auto">
								Your rights and responsibilities when using AmplifyAI
							</p>
							<div className="flex items-center justify-center mt-6 text-blue-100">
								<Calendar className="w-5 h-5 mr-2" />
								<span>Last updated: December 28, 2024</span>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Important Notice */}
				<ScrollReveal direction="up" delay={0.2}>
					<Card className="mb-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
						<CardContent className="p-6">
							<div className="flex items-start space-x-3">
								<AlertTriangle className="w-6 h-6 text-orange-600 mt-0.5" />
								<div>
									<h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
										Important Notice
									</h3>
									<p className="text-orange-700 dark:text-orange-300">
										By accessing or using AmplifyAI, you agree to be bound by
										these Terms of Service. If you do not agree to these terms,
										please do not use our service.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>

				{/* Navigation */}
				<ScrollReveal direction="up" delay={0.3}>
					<Card className="mb-8">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Shield className="w-5 h-5 mr-2" />
								Quick Navigation
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
								<Link
									href="#acceptance"
									className="text-blue-600 hover:underline"
								>
									1. Acceptance of Terms
								</Link>
								<Link
									href="#description"
									className="text-blue-600 hover:underline"
								>
									2. Service Description
								</Link>
								<Link
									href="#accounts"
									className="text-blue-600 hover:underline"
								>
									3. User Accounts
								</Link>
								<Link
									href="#acceptable-use"
									className="text-blue-600 hover:underline"
								>
									4. Acceptable Use
								</Link>
								<Link
									href="#subscription"
									className="text-blue-600 hover:underline"
								>
									5. Subscription & Billing
								</Link>
								<Link
									href="#intellectual-property"
									className="text-blue-600 hover:underline"
								>
									6. Intellectual Property
								</Link>
								<Link href="#privacy" className="text-blue-600 hover:underline">
									7. Privacy & Data
								</Link>
								<Link
									href="#termination"
									className="text-blue-600 hover:underline"
								>
									8. Termination
								</Link>
								<Link
									href="#disclaimers"
									className="text-blue-600 hover:underline"
								>
									9. Disclaimers
								</Link>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>

				{/* Terms Content */}
				<div className="space-y-8">
					<ScrollReveal direction="up" delay={0.4}>
						<section id="acceptance">
							<Card>
								<CardHeader>
									<CardTitle>1. Acceptance of Terms</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										These Terms of Service (&quot;Terms&quot;) constitute a
										legally binding agreement between you (&quot;User&quot;,
										&quot;you&quot;, or &quot;your&quot;) and AmplifyAI
										(&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
										&quot;our&quot;) regarding your use of the AmplifyAI
										platform and services.
									</p>
									<p>
										By creating an account, accessing, or using our service, you
										acknowledge that you have read, understood, and agree to be
										bound by these Terms, our Privacy Policy, and any additional
										terms that may apply to specific features or services.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.5}>
						<section id="description">
							<Card>
								<CardHeader>
									<CardTitle>2. Service Description</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										AmplifyAI is an AI-powered social media content generation
										platform that provides:
									</p>
									<ul>
										<li>AI-driven content creation and optimization</li>
										<li>Multi-platform social media posting and scheduling</li>
										<li>Performance analytics and insights</li>
										<li>Brand management and team collaboration tools</li>
										<li>Integration with major social media platforms</li>
									</ul>
									<p>
										We reserve the right to modify, suspend, or discontinue any
										aspect of our service at any time with or without notice.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<section id="accounts">
							<Card>
								<CardHeader>
									<CardTitle>3. User Accounts</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>3.1 Account Creation</h4>
									<p>
										To use our service, you must create an account by providing
										accurate and complete information. You are responsible for
										maintaining the confidentiality of your account credentials.
									</p>

									<h4>3.2 Account Responsibility</h4>
									<p>You are responsible for:</p>
									<ul>
										<li>All activities that occur under your account</li>
										<li>Maintaining the security of your login credentials</li>
										<li>Immediately notifying us of any unauthorized access</li>
										<li>
											Ensuring your account information remains accurate and
											up-to-date
										</li>
									</ul>

									<h4>3.3 Age Requirements</h4>
									<p>
										You must be at least 18 years old to use our service. By
										using AmplifyAI, you represent that you meet this age
										requirement.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.7}>
						<section id="acceptable-use">
							<Card>
								<CardHeader>
									<CardTitle>4. Acceptable Use Policy</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>4.1 Permitted Use</h4>
									<p>
										You may use AmplifyAI for lawful business and personal
										purposes in accordance with these Terms.
									</p>

									<h4>4.2 Prohibited Activities</h4>
									<p>You agree not to:</p>
									<ul>
										<li>
											Use the service for any illegal or unauthorized purpose
										</li>
										<li>
											Generate or distribute harmful, offensive, or
											inappropriate content
										</li>
										<li>
											Violate any social media platform&apos;s terms of service
										</li>
										<li>
											Attempt to reverse engineer or compromise our systems
										</li>
										<li>
											Share your account with others or create multiple accounts
										</li>
										<li>Use automated scripts or bots to access our service</li>
										<li>Infringe on intellectual property rights</li>
										<li>Transmit spam, malware, or malicious content</li>
									</ul>

									<p>
										For complete details, please refer to our{" "}
										<Link
											href="/legal/acceptable-use"
											className="text-blue-600 hover:underline"
										>
											Acceptable Use Policy
										</Link>
										.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<section id="subscription">
							<Card>
								<CardHeader>
									<CardTitle>5. Subscription and Billing</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>5.1 Subscription Plans</h4>
									<p>
										AmplifyAI offers various subscription plans with different
										features and usage limits. Current pricing is available on
										our pricing page.
									</p>

									<h4>5.2 Billing and Payment</h4>
									<ul>
										<li>
											Subscriptions are billed in advance on a monthly or annual
											basis
										</li>
										<li>
											Payment is due immediately upon subscription or renewal
										</li>
										<li>
											We accept major credit cards and other payment methods as
											displayed
										</li>
										<li>
											All fees are non-refundable except as stated in our Refund
											Policy
										</li>
									</ul>

									<h4>5.3 Usage Limits</h4>
									<p>
										Each subscription plan includes specific usage limits.
										Exceeding these limits may result in service restrictions or
										additional charges.
									</p>

									<h4>5.4 Automatic Renewal</h4>
									<p>
										Subscriptions automatically renew unless cancelled before
										the renewal date. You can cancel at any time through your
										account settings.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.9}>
						<section id="intellectual-property">
							<Card>
								<CardHeader>
									<CardTitle>6. Intellectual Property</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>6.1 Our Property</h4>
									<p>
										AmplifyAI and all related technology, content, and materials
										are owned by us and protected by intellectual property laws.
									</p>

									<h4>6.2 Your Content</h4>
									<p>
										You retain ownership of content you create or upload. By
										using our service, you grant us a limited license to
										process, store, and display your content as necessary to
										provide our services.
									</p>

									<h4>6.3 Generated Content</h4>
									<p>
										Content generated by our AI belongs to you, subject to our
										terms and any applicable third-party terms. You are
										responsible for ensuring generated content complies with
										applicable laws and platform policies.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.0}>
						<section id="privacy">
							<Card>
								<CardHeader>
									<CardTitle>7. Privacy and Data Protection</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										Your privacy is important to us. Our collection, use, and
										protection of your personal information is governed by our{" "}
										<Link
											href="/legal/privacy"
											className="text-blue-600 hover:underline"
										>
											Privacy Policy
										</Link>
										, which is incorporated into these Terms by reference.
									</p>
									<p>
										We comply with applicable data protection laws, including
										GDPR. For more information about your data rights, please
										see our{" "}
										<Link
											href="/legal/gdpr"
											className="text-blue-600 hover:underline"
										>
											GDPR Compliance
										</Link>{" "}
										page.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.1}>
						<section id="termination">
							<Card>
								<CardHeader>
									<CardTitle>8. Termination</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>8.1 Termination by You</h4>
									<p>
										You may terminate your account at any time through your
										account settings or by contacting our support team.
									</p>

									<h4>8.2 Termination by Us</h4>
									<p>
										We may suspend or terminate your access to our service if
										you violate these Terms or engage in activities that harm
										our service or other users.
									</p>

									<h4>8.3 Effect of Termination</h4>
									<p>
										Upon termination, your access to the service will cease, and
										we may delete your account and data in accordance with our
										data retention policies.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.2}>
						<section id="disclaimers">
							<Card>
								<CardHeader>
									<CardTitle>
										9. Disclaimers and Limitation of Liability
									</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>9.1 Service Disclaimer</h4>
									<p>
										Our service is provided &quot;as is&quot; without warranties
										of any kind. We do not guarantee that our service will be
										uninterrupted, error-free, or meet your specific
										requirements.
									</p>

									<h4>9.2 Limitation of Liability</h4>
									<p>
										To the maximum extent permitted by law, we shall not be
										liable for any indirect, incidental, special, consequential,
										or punitive damages arising from your use of our service.
									</p>

									<h4>9.3 Indemnification</h4>
									<p>
										You agree to indemnify and hold us harmless from any claims,
										damages, or expenses arising from your use of our service or
										violation of these Terms.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>
				</div>

				{/* Contact Information */}
				<ScrollReveal direction="up" delay={1.3}>
					<Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4">
								If you have any questions about these Terms of Service, please
								contact us:
							</p>
							<div className="space-y-2 text-sm">
								<p>
									<strong>Email:</strong> legal@amplifyai.com
								</p>
								<p>
									<strong>Address:</strong> AmplifyAI Legal Department
								</p>
								<p>
									<strong>Effective Date:</strong> December 28, 2024
								</p>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>
			</div>
		</div>
	);
}
