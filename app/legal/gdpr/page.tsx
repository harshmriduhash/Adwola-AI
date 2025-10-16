import {
	AlertCircle,
	Calendar,
	Download,
	Edit,
	Eye,
	Lock,
	Shield,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function GDPRCompliance() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Header */}
			<div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<ScrollReveal direction="up">
						<div className="text-center">
							<Badge
								variant="secondary"
								className="mb-4 bg-white/20 text-white border-white/30"
							>
								<Shield className="w-4 h-4 mr-2" />
								GDPR Compliance
							</Badge>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								GDPR Compliance
							</h1>
							<p className="text-xl text-purple-100 max-w-2xl mx-auto">
								Your data protection rights under the General Data Protection
								Regulation
							</p>
							<div className="flex items-center justify-center mt-6 text-purple-100">
								<Calendar className="w-5 h-5 mr-2" />
								<span>Effective since: May 25, 2018</span>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* GDPR Rights Overview */}
				<ScrollReveal direction="up" delay={0.2}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
						<Card className="text-center border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
							<CardContent className="p-6">
								<Eye className="w-8 h-8 mx-auto mb-3 text-blue-600" />
								<h3 className="font-semibold mb-2">Right to Access</h3>
								<p className="text-sm text-muted-foreground">
									View your personal data
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
							<CardContent className="p-6">
								<Edit className="w-8 h-8 mx-auto mb-3 text-green-600" />
								<h3 className="font-semibold mb-2">Right to Rectification</h3>
								<p className="text-sm text-muted-foreground">
									Correct inaccurate data
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
							<CardContent className="p-6">
								<Trash2 className="w-8 h-8 mx-auto mb-3 text-red-600" />
								<h3 className="font-semibold mb-2">Right to Erasure</h3>
								<p className="text-sm text-muted-foreground">
									Delete your data
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20">
							<CardContent className="p-6">
								<Download className="w-8 h-8 mx-auto mb-3 text-purple-600" />
								<h3 className="font-semibold mb-2">Right to Portability</h3>
								<p className="text-sm text-muted-foreground">
									Export your data
								</p>
							</CardContent>
						</Card>
					</div>
				</ScrollReveal>

				{/* Quick Actions */}
				<ScrollReveal direction="up" delay={0.3}>
					<Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
						<CardHeader>
							<CardTitle>Exercise Your GDPR Rights</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-6 text-muted-foreground">
								As an EU resident, you have specific rights regarding your
								personal data. Use the actions below to exercise these rights or
								contact our Data Protection Officer for assistance.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<Button
									variant="outline"
									className="h-auto flex-col py-4"
									asChild
								>
									<Link href="/dashboard/settings?tab=privacy">
										<Eye className="w-5 h-5 mb-2" />
										<span className="text-sm">Access My Data</span>
									</Link>
								</Button>
								<Button
									variant="outline"
									className="h-auto flex-col py-4"
									asChild
								>
									<Link href="/dashboard/settings?tab=export">
										<Download className="w-5 h-5 mb-2" />
										<span className="text-sm">Export Data</span>
									</Link>
								</Button>
								<Button
									variant="outline"
									className="h-auto flex-col py-4"
									asChild
								>
									<Link href="/dashboard/settings?tab=account">
										<Edit className="w-5 h-5 mb-2" />
										<span className="text-sm">Update Data</span>
									</Link>
								</Button>
								<Button
									variant="outline"
									className="h-auto flex-col py-4"
									asChild
								>
									<Link href="mailto:gdpr@amplifyai.com">
										<AlertCircle className="w-5 h-5 mb-2" />
										<span className="text-sm">Contact DPO</span>
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>

				{/* GDPR Content */}
				<div className="space-y-8">
					<ScrollReveal direction="up" delay={0.4}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>What is GDPR?</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										The General Data Protection Regulation (GDPR) is a
										comprehensive data protection law that came into effect on
										May 25, 2018. It gives EU residents greater control over
										their personal data and imposes strict requirements on
										organizations that process such data.
									</p>
									<p>
										At AmplifyAI, we are committed to full GDPR compliance and
										respect your privacy rights. This page explains how we
										implement GDPR requirements and how you can exercise your
										rights.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.5}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>Your Rights Under GDPR</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>1. Right of Access (Article 15)</h4>
									<p>
										You have the right to know what personal data we hold about
										you, how we use it, and who we share it with. You can
										request a copy of your personal data at any time.
									</p>
									<p>
										<strong>How to exercise:</strong> Visit your account
										settings or contact our DPO.
									</p>

									<h4>2. Right to Rectification (Article 16)</h4>
									<p>
										You can request correction of inaccurate or incomplete
										personal data. We will update your information promptly upon
										verification.
									</p>
									<p>
										<strong>How to exercise:</strong> Update your profile in
										account settings or contact support.
									</p>

									<h4>
										3. Right to Erasure (&quot;Right to be Forgotten&quot;)
										(Article 17)
									</h4>
									<p>
										You can request deletion of your personal data in certain
										circumstances, such as when the data is no longer necessary
										for the original purpose.
									</p>
									<p>
										<strong>How to exercise:</strong> Delete your account or
										contact our DPO with specific deletion requests.
									</p>

									<h4>4. Right to Restrict Processing (Article 18)</h4>
									<p>
										You can request that we limit how we process your personal
										data in certain situations, such as when you contest the
										accuracy of the data.
									</p>

									<h4>5. Right to Data Portability (Article 20)</h4>
									<p>
										You can request a copy of your personal data in a
										structured, machine-readable format to transfer to another
										service provider.
									</p>
									<p>
										<strong>How to exercise:</strong> Use our data export
										feature in account settings.
									</p>

									<h4>6. Right to Object (Article 21)</h4>
									<p>
										You can object to certain types of processing, particularly
										for direct marketing purposes or processing based on
										legitimate interests.
									</p>

									<h4>
										7. Rights Related to Automated Decision-Making (Article 22)
									</h4>
									<p>
										You have rights regarding automated decision-making and
										profiling. We will inform you about any automated processing
										that significantly affects you.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>Legal Basis for Processing</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										We process your personal data based on the following legal
										grounds:
									</p>

									<h4>Contract Performance (Article 6(1)(b))</h4>
									<ul>
										<li>Providing our AI content generation services</li>
										<li>Managing your account and subscription</li>
										<li>Processing payments and billing</li>
										<li>Delivering customer support</li>
									</ul>

									<h4>Legitimate Interests (Article 6(1)(f))</h4>
									<ul>
										<li>Improving our platform and services</li>
										<li>Ensuring platform security and preventing fraud</li>
										<li>Conducting analytics to understand user behavior</li>
										<li>Marketing our services to existing customers</li>
									</ul>

									<h4>Consent (Article 6(1)(a))</h4>
									<ul>
										<li>Email marketing communications</li>
										<li>Optional features and integrations</li>
										<li>Cookies and tracking technologies (where required)</li>
									</ul>

									<h4>Legal Obligation (Article 6(1)(c))</h4>
									<ul>
										<li>Compliance with tax and accounting requirements</li>
										<li>Responding to legal requests</li>
										<li>Regulatory compliance</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.7}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>Data Processing Activities</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>Data Categories We Process</h4>
									<ul>
										<li>
											<strong>Identity Data:</strong> Name, email address,
											account credentials
										</li>
										<li>
											<strong>Contact Data:</strong> Email address, company
											information
										</li>
										<li>
											<strong>Technical Data:</strong> IP address, browser type,
											device information
										</li>
										<li>
											<strong>Usage Data:</strong> Platform interaction, feature
											usage, preferences
										</li>
										<li>
											<strong>Content Data:</strong> Brand information, content
											briefs, generated posts
										</li>
										<li>
											<strong>Marketing Data:</strong> Communication
											preferences, engagement data
										</li>
									</ul>

									<h4>Data Processors We Use</h4>
									<p>
										We work with trusted data processors who meet GDPR
										standards:
									</p>
									<ul>
										<li>
											<strong>Supabase:</strong> Database hosting and
											authentication (EU/US)
										</li>
										<li>
											<strong>Stripe:</strong> Payment processing (EU/US)
										</li>
										<li>
											<strong>OpenAI:</strong> AI content generation (US)
										</li>
										<li>
											<strong>Google Cloud:</strong> AI services and
											infrastructure (EU/US)
										</li>
										<li>
											<strong>Vercel:</strong> Web hosting and CDN (EU/US)
										</li>
									</ul>

									<h4>International Transfers</h4>
									<p>
										When we transfer your data outside the EU, we ensure
										adequate protection through:
									</p>
									<ul>
										<li>Standard Contractual Clauses (SCCs)</li>
										<li>Adequacy decisions</li>
										<li>Binding Corporate Rules</li>
										<li>Your explicit consent</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>Data Security Measures</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>Technical Safeguards</h4>
									<ul>
										<li>
											<strong>Encryption:</strong> AES-256 encryption for data
											at rest and TLS 1.3 for data in transit
										</li>
										<li>
											<strong>Access Controls:</strong> Multi-factor
											authentication and role-based access
										</li>
										<li>
											<strong>Network Security:</strong> Firewalls, intrusion
											detection, and monitoring
										</li>
										<li>
											<strong>Regular Updates:</strong> Security patches and
											vulnerability management
										</li>
									</ul>

									<h4>Organizational Measures</h4>
									<ul>
										<li>
											<strong>Privacy by Design:</strong> Data protection built
											into our systems
										</li>
										<li>
											<strong>Staff Training:</strong> Regular GDPR and security
											training for all employees
										</li>
										<li>
											<strong>Data Minimization:</strong> We only collect data
											necessary for our services
										</li>
										<li>
											<strong>Regular Audits:</strong> Internal and external
											security assessments
										</li>
									</ul>

									<h4>Incident Response</h4>
									<p>
										In case of a data breach, we will notify relevant
										supervisory authorities within 72 hours and affected
										individuals without undue delay, as required by GDPR.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.9}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>Data Retention Periods</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>We retain personal data only as long as necessary:</p>

									<div className="overflow-x-auto">
										<table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
											<thead>
												<tr className="bg-gray-50 dark:bg-gray-800">
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Data Type
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Retention Period
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Legal Basis
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Account Data
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Until account deletion + 30 days
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Contract performance
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Content Data
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Until deletion by user
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Contract performance
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Usage Analytics
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														2 years (anonymized after 6 months)
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Legitimate interests
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Support Records
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														5 years
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Legitimate interests
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Financial Records
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														7 years
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Legal obligation
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.0}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>How to Exercise Your Rights</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>Self-Service Options</h4>
									<p>
										Many rights can be exercised directly through your account:
									</p>
									<ul>
										<li>
											<strong>Account Settings:</strong> Update personal
											information and preferences
										</li>
										<li>
											<strong>Privacy Dashboard:</strong> View and manage your
											data
										</li>
										<li>
											<strong>Data Export:</strong> Download your data in JSON
											format
										</li>
										<li>
											<strong>Account Deletion:</strong> Permanently delete your
											account and data
										</li>
									</ul>

									<h4>Contact Our Data Protection Officer</h4>
									<p>For complex requests or questions, contact our DPO:</p>
									<ul>
										<li>
											<strong>Email:</strong> gdpr@amplifyai.com
										</li>
										<li>
											<strong>Response Time:</strong> 30 days maximum (usually
											within 5 business days)
										</li>
										<li>
											<strong>Verification:</strong> We may request identity
											verification for security
										</li>
									</ul>

									<h4>Complaint Rights</h4>
									<p>
										If you&apos;re not satisfied with our response, you have the
										right to lodge a complaint with your local data protection
										authority. In the EU, you can find your authority at:{" "}
										<a
											href="https://edpb.europa.eu/about-edpb/board/members_en"
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline"
										>
											European Data Protection Board
										</a>
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>
				</div>

				{/* Contact Information */}
				<ScrollReveal direction="up" delay={1.1}>
					<Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Lock className="w-5 h-5 mr-2" />
								Data Protection Contacts
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold mb-3">
										Data Protection Officer
									</h4>
									<div className="space-y-2 text-sm">
										<p>
											<strong>Email:</strong> gdpr@amplifyai.com
										</p>
										<p>
											<strong>Phone:</strong> +1 (555) 123-4567 ext. 2
										</p>
										<p>
											<strong>Response Time:</strong> 5 business days
										</p>
									</div>
								</div>
								<div>
									<h4 className="font-semibold mb-3">EU Representative</h4>
									<div className="space-y-2 text-sm">
										<p>
											<strong>Email:</strong> eu-representative@amplifyai.com
										</p>
										<p>
											<strong>Address:</strong> GDPR Representative Services
										</p>
										<p>
											<strong>City:</strong> Dublin, Ireland
										</p>
									</div>
								</div>
							</div>
							<div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
								<p className="text-sm">
									<strong>Emergency Data Protection Concerns:</strong> For
									urgent security or privacy matters, contact
									security@amplifyai.com or call our 24/7 security hotline.
								</p>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>
			</div>
		</div>
	);
}
