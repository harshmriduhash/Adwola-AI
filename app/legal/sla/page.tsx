import {
	Activity,
	Calendar,
	CheckCircle,
	Clock,
	TrendingUp,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function ServiceLevelAgreement() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<ScrollReveal direction="up">
						<div className="text-center">
							<Badge
								variant="secondary"
								className="mb-4 bg-white/20 text-white border-white/30"
							>
								<Activity className="w-4 h-4 mr-2" />
								Service Level Agreement
							</Badge>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Service Level Agreement
							</h1>
							<p className="text-xl text-blue-100 max-w-2xl mx-auto">
								Our commitment to reliable, high-performance service delivery
							</p>
							<div className="flex items-center justify-center mt-6 text-blue-100">
								<Calendar className="w-5 h-5 mr-2" />
								<span>Effective: December 28, 2024</span>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* SLA Metrics Overview */}
				<ScrollReveal direction="up" delay={0.2}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
						<Card className="text-center border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
							<CardContent className="p-6">
								<TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-600" />
								<div className="text-2xl font-bold text-green-600 mb-1">
									99.9%
								</div>
								<h3 className="font-semibold mb-1">Uptime</h3>
								<p className="text-sm text-muted-foreground">
									Platform availability
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
							<CardContent className="p-6">
								<Zap className="w-8 h-8 mx-auto mb-3 text-blue-600" />
								<div className="text-2xl font-bold text-blue-600 mb-1">
									&lt;2s
								</div>
								<h3 className="font-semibold mb-1">Response Time</h3>
								<p className="text-sm text-muted-foreground">
									API response time
								</p>
							</CardContent>
						</Card>
						<Card className="text-center border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20">
							<CardContent className="p-6">
								<Clock className="w-8 h-8 mx-auto mb-3 text-purple-600" />
								<div className="text-2xl font-bold text-purple-600 mb-1">
									2h
								</div>
								<h3 className="font-semibold mb-1">Support Response</h3>
								<p className="text-sm text-muted-foreground">Critical issues</p>
							</CardContent>
						</Card>
						<Card className="text-center border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
							<CardContent className="p-6">
								<CheckCircle className="w-8 h-8 mx-auto mb-3 text-orange-600" />
								<div className="text-2xl font-bold text-orange-600 mb-1">
									24/7
								</div>
								<h3 className="font-semibold mb-1">Monitoring</h3>
								<p className="text-sm text-muted-foreground">
									System monitoring
								</p>
							</CardContent>
						</Card>
					</div>
				</ScrollReveal>

				{/* SLA Content */}
				<div className="space-y-8">
					<ScrollReveal direction="up" delay={0.3}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>1. Service Level Commitments</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										This Service Level Agreement (&quot;SLA&quot;) defines the
										performance and availability standards that AmplifyAI
										commits to maintaining for our platform and services.
									</p>
									<p>
										These commitments apply to all paid subscription plans and
										are measured monthly based on system monitoring data from
										our infrastructure providers.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>2. Uptime and Availability</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>2.1 Uptime Commitment</h4>
									<p>
										We guarantee 99.9% uptime for our platform, measured
										monthly. This equals a maximum of 43.8 minutes of downtime
										per month.
									</p>

									<h4>2.2 Planned Maintenance</h4>
									<ul>
										<li>
											Scheduled maintenance windows: Sundays 2:00-6:00 AM PST
										</li>
										<li>Advance notification: 48 hours minimum</li>
										<li>
											Emergency maintenance: As needed with immediate
											notification
										</li>
										<li>
											Planned maintenance does not count against uptime SLA
										</li>
									</ul>

									<h4>2.3 Service Availability by Tier</h4>
									<div className="overflow-x-auto">
										<table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
											<thead>
												<tr className="bg-gray-50 dark:bg-gray-800">
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Plan
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Uptime SLA
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Monthly Downtime
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Free
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Best Effort
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														No SLA
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Pro
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														99.9%
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														43.8 minutes
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Agency
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														99.95%
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														21.9 minutes
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.5}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>3. Performance Standards</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>3.1 API Response Times</h4>
									<ul>
										<li>
											<strong>Standard API calls:</strong> &lt; 2 seconds (95th
											percentile)
										</li>
										<li>
											<strong>Content generation:</strong> &lt; 30 seconds
											(standard requests)
										</li>
										<li>
											<strong>Bulk operations:</strong> &lt; 60 seconds (per
											batch)
										</li>
										<li>
											<strong>Analytics queries:</strong> &lt; 5 seconds
										</li>
									</ul>

									<h4>3.2 AI Processing Performance</h4>
									<ul>
										<li>
											<strong>Single post generation:</strong> 10-30 seconds
										</li>
										<li>
											<strong>Batch generation (5 posts):</strong> 30-90 seconds
										</li>
										<li>
											<strong>Image prompt generation:</strong> 5-15 seconds
										</li>
										<li>
											<strong>Content optimization:</strong> 15-45 seconds
										</li>
									</ul>

									<h4>3.3 Data Processing</h4>
									<ul>
										<li>
											<strong>Real-time updates:</strong> &lt; 5 seconds
										</li>
										<li>
											<strong>Analytics refresh:</strong> &lt; 30 seconds
										</li>
										<li>
											<strong>Data export:</strong> &lt; 2 minutes
										</li>
										<li>
											<strong>Account setup:</strong> Immediate
										</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>4. Support Response Times</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>4.1 Support Tiers by Plan</h4>
									<div className="overflow-x-auto">
										<table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
											<thead>
												<tr className="bg-gray-50 dark:bg-gray-800">
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Priority
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Free
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Pro
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Agency
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Critical
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														48 hours
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														4 hours
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														2 hours
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														High
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														72 hours
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														8 hours
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														4 hours
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Medium
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														5 days
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														24 hours
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														12 hours
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Low
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														Best effort
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														48 hours
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														24 hours
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<h4>4.2 Issue Priority Definitions</h4>
									<ul>
										<li>
											<strong>Critical:</strong> Service completely unavailable
											or data loss
										</li>
										<li>
											<strong>High:</strong> Major features not working,
											significant impact
										</li>
										<li>
											<strong>Medium:</strong> Minor features not working,
											workaround available
										</li>
										<li>
											<strong>Low:</strong> General questions, feature requests
										</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.7}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>5. Monitoring and Measurement</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>5.1 Monitoring Infrastructure</h4>
									<ul>
										<li>
											<strong>24/7 automated monitoring</strong> of all critical
											systems
										</li>
										<li>
											<strong>Real-time alerting</strong> for service
											disruptions
										</li>
										<li>
											<strong>Performance metrics</strong> collected every
											minute
										</li>
										<li>
											<strong>Third-party monitoring</strong> for external
											validation
										</li>
									</ul>

									<h4>5.2 Measurement Methods</h4>
									<ul>
										<li>
											<strong>Uptime:</strong> Measured by external ping tests
											every 30 seconds
										</li>
										<li>
											<strong>Response time:</strong> Measured by synthetic API
											calls
										</li>
										<li>
											<strong>Error rate:</strong> Tracked through application
											logs
										</li>
										<li>
											<strong>Performance:</strong> Real user monitoring (RUM)
										</li>
									</ul>

									<h4>5.3 Status Page</h4>
									<p>
										Real-time service status is available at{" "}
										<Link
											href="https://status.amplifyai.com"
											className="text-blue-600 hover:underline"
										>
											status.amplifyai.com
										</Link>
										, including:
									</p>
									<ul>
										<li>Current system status</li>
										<li>Incident history and updates</li>
										<li>Scheduled maintenance notifications</li>
										<li>Performance metrics dashboard</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>6. Service Credits and Remedies</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>6.1 Service Credit Calculation</h4>
									<p>
										If we fail to meet our SLA commitments, eligible customers
										may receive service credits:
									</p>

									<div className="overflow-x-auto">
										<table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
											<thead>
												<tr className="bg-gray-50 dark:bg-gray-800">
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Uptime Achieved
													</th>
													<th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
														Service Credit
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														99.0% - 99.89%
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														10% of monthly fee
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														95.0% - 98.99%
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														25% of monthly fee
													</td>
												</tr>
												<tr>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														&lt; 95.0%
													</td>
													<td className="border border-gray-300 dark:border-gray-700 p-3">
														50% of monthly fee
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<h4>6.2 Credit Request Process</h4>
									<ul>
										<li>Submit request within 30 days of the incident</li>
										<li>Provide details of the impact on your business</li>
										<li>Include relevant timestamps and evidence</li>
										<li>Credits are applied to your next billing cycle</li>
									</ul>

									<h4>6.3 Limitations</h4>
									<ul>
										<li>
											Credits cannot exceed 50% of monthly subscription fee
										</li>
										<li>Credits do not apply to usage-based charges</li>
										<li>Only available to paid subscription customers</li>
										<li>Must be requested within the specified timeframe</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.9}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>7. Exclusions and Limitations</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>7.1 SLA Exclusions</h4>
									<p>This SLA does not apply to:</p>
									<ul>
										<li>Free tier usage and trial accounts</li>
										<li>
											Issues caused by third-party services (social platforms,
											AI providers)
										</li>
										<li>Network connectivity issues outside our control</li>
										<li>User configuration errors or misuse</li>
										<li>Planned maintenance windows</li>
										<li>Force majeure events</li>
									</ul>

									<h4>7.2 Third-Party Dependencies</h4>
									<p>Our service relies on third-party providers:</p>
									<ul>
										<li>
											<strong>AI Services:</strong> OpenAI, Google Cloud AI
										</li>
										<li>
											<strong>Infrastructure:</strong> Supabase, Vercel, AWS
										</li>
										<li>
											<strong>Social Platforms:</strong> LinkedIn, Twitter,
											Facebook, Instagram
										</li>
										<li>
											<strong>Payment Processing:</strong> Stripe
										</li>
									</ul>
									<p>
										Issues with these providers may affect our service levels
										and are outside our direct control.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.0}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>8. Incident Response</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>8.1 Incident Classification</h4>
									<ul>
										<li>
											<strong>P1 (Critical):</strong> Complete service outage
											affecting all users
										</li>
										<li>
											<strong>P2 (High):</strong> Major feature unavailable or
											significant performance degradation
										</li>
										<li>
											<strong>P3 (Medium):</strong> Minor feature issues with
											workarounds available
										</li>
										<li>
											<strong>P4 (Low):</strong> Minor issues with minimal
											impact
										</li>
									</ul>

									<h4>8.2 Response Timeline</h4>
									<ul>
										<li>
											<strong>P1:</strong> 15 minutes acknowledgment, 1 hour
											status update
										</li>
										<li>
											<strong>P2:</strong> 30 minutes acknowledgment, 2 hour
											status update
										</li>
										<li>
											<strong>P3:</strong> 2 hours acknowledgment, daily updates
										</li>
										<li>
											<strong>P4:</strong> Next business day acknowledgment
										</li>
									</ul>

									<h4>8.3 Communication</h4>
									<ul>
										<li>Status page updates for all incidents</li>
										<li>Email notifications for affected customers</li>
										<li>Regular progress updates during resolution</li>
										<li>Post-incident reports for major issues</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>
				</div>

				{/* Contact Information */}
				<ScrollReveal direction="up" delay={1.1}>
					<Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Activity className="w-5 h-5 mr-2" />
								SLA Support and Monitoring
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold mb-3">
										Service Credits & SLA Claims
									</h4>
									<div className="space-y-2 text-sm">
										<p>
											<strong>Email:</strong> sla@amplifyai.com
										</p>
										<p>
											<strong>Status Page:</strong> status.amplifyai.com
										</p>
										<p>
											<strong>Response Time:</strong> 24 hours
										</p>
									</div>
								</div>
								<div>
									<h4 className="font-semibold mb-3">Technical Support</h4>
									<div className="space-y-2 text-sm">
										<p>
											<strong>Critical Issues:</strong> support@amplifyai.com
										</p>
										<p>
											<strong>Emergency Line:</strong> Available for Agency
											customers
										</p>
										<p>
											<strong>24/7 Monitoring:</strong> Automated alerts and
											response
										</p>
									</div>
								</div>
							</div>
							<div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
								<p className="text-sm">
									<strong>Real-time Status:</strong> Check{" "}
									<Link
										href="https://status.amplifyai.com"
										className="text-blue-600 hover:underline"
									>
										status.amplifyai.com
									</Link>{" "}
									for current system status, incident updates, and historical
									performance data.
								</p>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>
			</div>
		</div>
	);
}
