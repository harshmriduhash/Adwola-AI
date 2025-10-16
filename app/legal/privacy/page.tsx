import { Calendar, Database, Eye, Lock, Shield, UserCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Header */}
			<div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<ScrollReveal direction="up">
						<div className="text-center">
							<Badge
								variant="secondary"
								className="mb-4 bg-white/20 text-white border-white/30"
							>
								<Shield className="w-4 h-4 mr-2" />
								Privacy & Security
							</Badge>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Privacy Policy
							</h1>
							<p className="text-xl text-green-100 max-w-2xl mx-auto">
								How we collect, use, and protect your personal information
							</p>
							<div className="flex items-center justify-center mt-6 text-green-100">
								<Calendar className="w-5 h-5 mr-2" />
								<span>Last updated: December 28, 2024</span>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Key Principles */}
				<ScrollReveal direction="up" delay={0.2}>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
						<Card className="text-center border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
							<CardContent className="p-6">
								<Lock className="w-8 h-8 mx-auto mb-3 text-green-600" />
								<h3 className="font-semibold mb-2">Data Security</h3>
								<p className="text-sm text-muted-foreground">
									Enterprise-grade encryption and security measures
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
							<CardContent className="p-6">
								<Eye className="w-8 h-8 mx-auto mb-3 text-blue-600" />
								<h3 className="font-semibold mb-2">Transparency</h3>
								<p className="text-sm text-muted-foreground">
									Clear information about data collection and use
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20">
							<CardContent className="p-6">
								<UserCheck className="w-8 h-8 mx-auto mb-3 text-purple-600" />
								<h3 className="font-semibold mb-2">Your Control</h3>
								<p className="text-sm text-muted-foreground">
									Full control over your personal data and privacy
								</p>
							</CardContent>
						</Card>
					</div>
				</ScrollReveal>

				{/* Navigation */}
				<ScrollReveal direction="up" delay={0.3}>
					<Card className="mb-8">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Database className="w-5 h-5 mr-2" />
								Quick Navigation
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
								<Link
									href="#information-collected"
									className="text-blue-600 hover:underline"
								>
									Information We Collect
								</Link>
								<Link
									href="#how-we-use"
									className="text-blue-600 hover:underline"
								>
									How We Use Information
								</Link>
								<Link href="#sharing" className="text-blue-600 hover:underline">
									Information Sharing
								</Link>
								<Link
									href="#security"
									className="text-blue-600 hover:underline"
								>
									Data Security
								</Link>
								<Link
									href="#your-rights"
									className="text-blue-600 hover:underline"
								>
									Your Rights
								</Link>
								<Link href="#cookies" className="text-blue-600 hover:underline">
									Cookies & Tracking
								</Link>
								<Link
									href="#international"
									className="text-blue-600 hover:underline"
								>
									International Transfers
								</Link>
								<Link
									href="#retention"
									className="text-blue-600 hover:underline"
								>
									Data Retention
								</Link>
								<Link href="#contact" className="text-blue-600 hover:underline">
									Contact Us
								</Link>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>

				{/* Privacy Policy Content */}
				<div className="space-y-8">
					<ScrollReveal direction="up" delay={0.4}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>Introduction</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										At AmplifyAI, we are committed to protecting your privacy
										and ensuring the security of your personal information. This
										Privacy Policy explains how we collect, use, share, and
										protect your information when you use our AI-powered social
										media content platform.
									</p>
									<p>
										By using AmplifyAI, you consent to the collection and use of
										your information as described in this policy. If you do not
										agree with this policy, please do not use our services.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.5}>
						<section id="information-collected">
							<Card>
								<CardHeader>
									<CardTitle>1. Information We Collect</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>1.1 Information You Provide</h4>
									<ul>
										<li>
											<strong>Account Information:</strong> Name, email address,
											password, company details
										</li>
										<li>
											<strong>Profile Information:</strong> Bio, preferences,
											profile picture
										</li>
										<li>
											<strong>Content Data:</strong> Brand information, content
											briefs, generated posts
										</li>
										<li>
											<strong>Payment Information:</strong> Billing address,
											payment method details (processed securely by Stripe)
										</li>
										<li>
											<strong>Communication Data:</strong> Support tickets,
											feedback, survey responses
										</li>
									</ul>

									<h4>1.2 Information We Collect Automatically</h4>
									<ul>
										<li>
											<strong>Usage Data:</strong> Features used, time spent,
											click patterns, preferences
										</li>
										<li>
											<strong>Device Information:</strong> IP address, browser
											type, operating system, device identifiers
										</li>
										<li>
											<strong>Log Data:</strong> Server logs, error reports,
											performance metrics
										</li>
										<li>
											<strong>Analytics Data:</strong> User engagement, feature
											usage, performance analytics
										</li>
									</ul>

									<h4>1.3 Information from Third Parties</h4>
									<ul>
										<li>
											<strong>Social Media Platforms:</strong> When you connect
											your social accounts (with your permission)
										</li>
										<li>
											<strong>Integration Partners:</strong> Data from connected
											tools and services
										</li>
										<li>
											<strong>Public Sources:</strong> Publicly available
											business information for verification
										</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<section id="how-we-use">
							<Card>
								<CardHeader>
									<CardTitle>2. How We Use Your Information</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>2.1 Service Provision</h4>
									<ul>
										<li>
											Generate AI-powered content based on your brand and
											preferences
										</li>
										<li>
											Schedule and publish content to your connected social
											media accounts
										</li>
										<li>Provide analytics and performance insights</li>
										<li>
											Enable team collaboration and content approval workflows
										</li>
									</ul>

									<h4>2.2 Platform Improvement</h4>
									<ul>
										<li>
											Analyze usage patterns to improve our AI models and
											features
										</li>
										<li>Monitor system performance and reliability</li>
										<li>Develop new features and capabilities</li>
										<li>Conduct research and development activities</li>
									</ul>

									<h4>2.3 Communication</h4>
									<ul>
										<li>Send important service updates and notifications</li>
										<li>Provide customer support and respond to inquiries</li>
										<li>
											Share relevant product updates and educational content
											(with your consent)
										</li>
										<li>Conduct surveys and gather feedback</li>
									</ul>

									<h4>2.4 Legal and Security</h4>
									<ul>
										<li>
											Comply with legal obligations and regulatory requirements
										</li>
										<li>Protect against fraud, abuse, and security threats</li>
										<li>Enforce our Terms of Service and other policies</li>
										<li>Respond to legal requests and court orders</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.7}>
						<section id="sharing">
							<Card>
								<CardHeader>
									<CardTitle>3. Information Sharing and Disclosure</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>3.1 We Do Not Sell Your Data</h4>
									<p>
										We do not sell, rent, or trade your personal information to
										third parties for marketing purposes.
									</p>

									<h4>3.2 Service Providers</h4>
									<p>
										We may share your information with trusted service providers
										who help us operate our platform:
									</p>
									<ul>
										<li>
											<strong>Cloud Infrastructure:</strong> Supabase for
											database and authentication services
										</li>
										<li>
											<strong>Payment Processing:</strong> Stripe for secure
											payment handling
										</li>
										<li>
											<strong>AI Services:</strong> OpenAI and Google for
											content generation
										</li>
										<li>
											<strong>Analytics:</strong> Privacy-focused analytics
											providers
										</li>
										<li>
											<strong>Customer Support:</strong> Support and
											communication tools
										</li>
									</ul>

									<h4>3.3 Social Media Platforms</h4>
									<p>
										When you authorize us to post content to your social media
										accounts, we share the content you&apos;ve approved with the
										respective platforms according to their APIs and terms of
										service.
									</p>

									<h4>3.4 Legal Requirements</h4>
									<p>
										We may disclose your information when required by law or to:
									</p>
									<ul>
										<li>Comply with legal processes or government requests</li>
										<li>Protect our rights, property, or safety</li>
										<li>
											Protect the rights, property, or safety of our users
										</li>
										<li>Prevent fraud or abuse of our services</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<section id="security">
							<Card>
								<CardHeader>
									<CardTitle>4. Data Security</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>4.1 Security Measures</h4>
									<p>
										We implement industry-standard security measures to protect
										your data:
									</p>
									<ul>
										<li>
											<strong>Encryption:</strong> All data is encrypted in
											transit and at rest using AES-256 encryption
										</li>
										<li>
											<strong>Access Controls:</strong> Strict access controls
											and authentication requirements
										</li>
										<li>
											<strong>Network Security:</strong> Firewalls, intrusion
											detection, and monitoring systems
										</li>
										<li>
											<strong>Regular Audits:</strong> Security assessments and
											vulnerability testing
										</li>
										<li>
											<strong>SOC 2 Compliance:</strong> We maintain SOC 2 Type
											II certification
										</li>
									</ul>

									<h4>4.2 Data Breach Response</h4>
									<p>
										In the unlikely event of a data breach, we will notify
										affected users and relevant authorities within 72 hours as
										required by applicable laws.
									</p>

									<h4>4.3 Employee Access</h4>
									<p>
										Access to personal data is restricted to authorized
										employees who need it to perform their job functions. All
										employees undergo security training and sign confidentiality
										agreements.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.9}>
						<section id="your-rights">
							<Card>
								<CardHeader>
									<CardTitle>5. Your Privacy Rights</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>5.1 Access and Control</h4>
									<p>You have the right to:</p>
									<ul>
										<li>
											<strong>Access:</strong> Request a copy of the personal
											data we hold about you
										</li>
										<li>
											<strong>Correction:</strong> Update or correct inaccurate
											personal information
										</li>
										<li>
											<strong>Deletion:</strong> Request deletion of your
											personal data (subject to legal requirements)
										</li>
										<li>
											<strong>Portability:</strong> Export your data in a
											machine-readable format
										</li>
										<li>
											<strong>Restriction:</strong> Limit how we process your
											personal data
										</li>
										<li>
											<strong>Objection:</strong> Object to certain types of
											data processing
										</li>
									</ul>

									<h4>5.2 Communication Preferences</h4>
									<p>
										You can control marketing communications through your
										account settings or by using the unsubscribe links in our
										emails. Note that you cannot opt out of essential service
										communications.
									</p>

									<h4>5.3 Account Deletion</h4>
									<p>
										You can delete your account at any time through your account
										settings. Upon deletion, we will remove your personal data
										within 30 days, except as required for legal or business
										purposes.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.0}>
						<section id="cookies">
							<Card>
								<CardHeader>
									<CardTitle>6. Cookies and Tracking Technologies</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>6.1 Types of Cookies</h4>
									<ul>
										<li>
											<strong>Essential Cookies:</strong> Required for basic
											site functionality and security
										</li>
										<li>
											<strong>Functional Cookies:</strong> Remember your
											preferences and settings
										</li>
										<li>
											<strong>Analytics Cookies:</strong> Help us understand how
											you use our platform
										</li>
										<li>
											<strong>Performance Cookies:</strong> Monitor and improve
											site performance
										</li>
									</ul>

									<h4>6.2 Cookie Management</h4>
									<p>
										You can manage cookie preferences through our cookie banner
										and your browser settings. Disabling certain cookies may
										affect the functionality of our platform.
									</p>

									<h4>6.3 Third-Party Tracking</h4>
									<p>
										We use privacy-focused analytics tools and do not use
										third-party advertising trackers or pixels on our platform.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.1}>
						<section id="international">
							<Card>
								<CardHeader>
									<CardTitle>7. International Data Transfers</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										AmplifyAI operates globally, and your data may be
										transferred to and processed in countries other than your
										own. We ensure adequate protection for international
										transfers through:
									</p>
									<ul>
										<li>
											Standard Contractual Clauses (SCCs) approved by the
											European Commission
										</li>
										<li>
											Adequacy decisions for transfers to countries with
											adequate protection
										</li>
										<li>
											Binding Corporate Rules for transfers within our
											organization
										</li>
										<li>Your explicit consent where required</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.2}>
						<section id="retention">
							<Card>
								<CardHeader>
									<CardTitle>8. Data Retention</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										We retain your personal data only as long as necessary for
										the purposes outlined in this policy:
									</p>
									<ul>
										<li>
											<strong>Account Data:</strong> Until you delete your
											account or 3 years of inactivity
										</li>
										<li>
											<strong>Content Data:</strong> Until you delete the
											content or your account
										</li>
										<li>
											<strong>Usage Data:</strong> Aggregated and anonymized
											after 2 years
										</li>
										<li>
											<strong>Support Data:</strong> 5 years for quality and
											training purposes
										</li>
										<li>
											<strong>Legal Data:</strong> As required by applicable
											laws and regulations
										</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>
				</div>

				{/* Contact Information */}
				<ScrollReveal direction="up" delay={1.3}>
					<Card
						className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800"
						id="contact"
					>
						<CardHeader>
							<CardTitle>Data Protection Officer & Contact</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4">
								For privacy-related questions, concerns, or to exercise your
								rights, please contact our Data Protection Officer:
							</p>
							<div className="space-y-2 text-sm">
								<p>
									<strong>Email:</strong> privacy@amplifyai.com
								</p>
								<p>
									<strong>Data Protection Officer:</strong> dpo@amplifyai.com
								</p>
								<p>
									<strong>GDPR Inquiries:</strong> gdpr@amplifyai.com
								</p>
								<p>
									<strong>Address:</strong> AmplifyAI Privacy Team
								</p>
								<p>
									<strong>Response Time:</strong> We will respond to your
									inquiry within 30 days
								</p>
							</div>
							<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<p className="text-sm">
									<strong>EU Representative:</strong> If you are in the European
									Union and need to contact our EU representative, please email:
									eu-representative@amplifyai.com
								</p>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>
			</div>
		</div>
	);
}
