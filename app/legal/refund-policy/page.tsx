import { Calendar, Clock, CreditCard, DollarSign } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function RefundPolicy() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Header */}
			<div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<ScrollReveal direction="up">
						<div className="text-center">
							<Badge
								variant="secondary"
								className="mb-4 bg-white/20 text-white border-white/30"
							>
								<DollarSign className="w-4 h-4 mr-2" />
								Refund Policy
							</Badge>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Refund Policy
							</h1>
							<p className="text-xl text-green-100 max-w-2xl mx-auto">
								Our commitment to fair and transparent refund practices
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
				{/* Quick Actions */}
				<ScrollReveal direction="up" delay={0.2}>
					<Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
						<CardHeader>
							<CardTitle>Need a Refund?</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4 text-muted-foreground">
								If you believe you&apos;re eligible for a refund based on our
								policy below, please contact our billing team for assistance.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button asChild>
									<Link href="mailto:billing@amplifyai.com">
										<CreditCard className="w-4 h-4 mr-2" />
										Request Refund
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href="/dashboard/settings?tab=billing">
										View Billing History
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>

				{/* Policy Content */}
				<div className="space-y-8">
					<ScrollReveal direction="up" delay={0.3}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>1. General Refund Policy</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>
										AmplifyAI is committed to customer satisfaction. While our
										services are generally non-refundable due to their digital
										nature and immediate delivery, we offer refunds in specific
										circumstances outlined in this policy.
									</p>
									<p>
										All refund requests must be submitted within the applicable
										time frame and meet the criteria specified below.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>2. 14-Day Money-Back Guarantee</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>2.1 New Customers</h4>
									<p>
										First-time subscribers to our Pro or Agency plans are
										eligible for a full refund if requested within 14 days of
										the initial subscription.
									</p>

									<h4>2.2 Eligibility Requirements</h4>
									<ul>
										<li>
											Must be a first-time subscriber (not previously refunded)
										</li>
										<li>Request must be made within 14 calendar days</li>
										<li>Account must not have violated our Terms of Service</li>
										<li>
											Usage must be within reasonable limits (not excessive)
										</li>
									</ul>

									<h4>2.3 Exclusions</h4>
									<p>The money-back guarantee does not apply to:</p>
									<ul>
										<li>Free plan users</li>
										<li>Renewal payments</li>
										<li>Annual subscriptions after 30 days</li>
										<li>Add-on services or premium features</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.5}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>3. Service-Related Refunds</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>3.1 Service Outages</h4>
									<p>
										If our service experiences significant downtime (more than
										24 consecutive hours), affected customers may be eligible
										for a prorated refund or service credit.
									</p>

									<h4>3.2 Major Feature Failures</h4>
									<p>
										If core features fail to work as advertised for an extended
										period, we may offer partial refunds or service credits at
										our discretion.
									</p>

									<h4>3.3 Billing Errors</h4>
									<p>
										We will promptly refund any charges resulting from billing
										errors, including:
									</p>
									<ul>
										<li>Duplicate charges</li>
										<li>Incorrect pricing applied</li>
										<li>Charges after cancellation</li>
										<li>Unauthorized transactions</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>4. Non-Refundable Items</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<p>The following items are generally non-refundable:</p>

									<h4>4.1 Usage-Based Charges</h4>
									<ul>
										<li>Content generation credits that have been used</li>
										<li>API calls and processing fees</li>
										<li>Third-party integration costs</li>
										<li>Premium AI model usage</li>
									</ul>

									<h4>4.2 Subscription Renewals</h4>
									<ul>
										<li>
											Automatic renewal charges (after the initial period)
										</li>
										<li>Plan upgrades mid-cycle</li>
										<li>Additional user seats</li>
									</ul>

									<h4>4.3 Violation-Related Terminations</h4>
									<ul>
										<li>Accounts terminated for Terms of Service violations</li>
										<li>Accounts suspended for abuse or fraud</li>
										<li>Voluntary account deletions after the refund period</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.7}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>5. Refund Process</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>5.1 How to Request a Refund</h4>
									<ol>
										<li>Contact our billing team at billing@amplifyai.com</li>
										<li>
											Include your account email and reason for the refund
											request
										</li>
										<li>Provide any relevant details or documentation</li>
										<li>Wait for our team to review your request</li>
									</ol>

									<h4>5.2 Review Process</h4>
									<ul>
										<li>
											<strong>Initial Response:</strong> Within 2 business days
										</li>
										<li>
											<strong>Review Period:</strong> Up to 5 business days
										</li>
										<li>
											<strong>Decision Notification:</strong> Via email
										</li>
										<li>
											<strong>Processing Time:</strong> 5-10 business days if
											approved
										</li>
									</ul>

									<h4>5.3 Refund Methods</h4>
									<p>
										Refunds will be processed using the original payment method:
									</p>
									<ul>
										<li>
											<strong>Credit Cards:</strong> 5-10 business days
										</li>
										<li>
											<strong>PayPal:</strong> 3-5 business days
										</li>
										<li>
											<strong>Bank Transfers:</strong> 7-14 business days
										</li>
										<li>
											<strong>Digital Wallets:</strong> 1-3 business days
										</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>6. Partial Refunds and Credits</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>6.1 Prorated Refunds</h4>
									<p>
										In certain circumstances, we may offer prorated refunds
										based on unused service time:
									</p>
									<ul>
										<li>Service downgrades mid-cycle</li>
										<li>Significant service disruptions</li>
										<li>Early cancellations in exceptional cases</li>
									</ul>

									<h4>6.2 Service Credits</h4>
									<p>We may offer service credits instead of refunds for:</p>
									<ul>
										<li>Minor service interruptions</li>
										<li>Customer satisfaction gestures</li>
										<li>Billing adjustments</li>
										<li>Loyalty program benefits</li>
									</ul>

									<h4>6.3 Credit Usage</h4>
									<ul>
										<li>Credits automatically apply to future bills</li>
										<li>Credits expire after 12 months if unused</li>
										<li>Credits are non-transferable between accounts</li>
										<li>Credits cannot be converted to cash</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.9}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>7. Cancellation vs. Refund</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>7.1 Cancellation</h4>
									<p>
										Cancelling your subscription stops future billing but does
										not trigger an automatic refund. You can continue using the
										service until the end of your current billing period.
									</p>

									<h4>7.2 Immediate Termination</h4>
									<p>
										If you need to terminate service immediately and qualify for
										a refund, please contact our billing team to discuss your
										options.
									</p>

									<h4>7.3 Data Retention</h4>
									<p>
										After cancellation or refund, your data will be retained
										according to our data retention policy, typically 30 days
										for account recovery purposes.
									</p>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={1.0}>
						<section>
							<Card>
								<CardHeader>
									<CardTitle>8. Dispute Resolution</CardTitle>
								</CardHeader>
								<CardContent className="prose prose-gray dark:prose-invert max-w-none">
									<h4>8.1 Internal Appeals</h4>
									<p>
										If your refund request is denied, you may appeal the
										decision by providing additional information or
										documentation to billing@amplifyai.com.
									</p>

									<h4>8.2 Chargeback Prevention</h4>
									<p>
										Before initiating a chargeback with your bank or credit card
										company, please contact us to resolve the issue. Chargebacks
										may result in account suspension.
									</p>

									<h4>8.3 External Dispute Resolution</h4>
									<p>For unresolved disputes, you may contact:</p>
									<ul>
										<li>Your local consumer protection agency</li>
										<li>Better Business Bureau</li>
										<li>Payment processor dispute resolution</li>
									</ul>
								</CardContent>
							</Card>
						</section>
					</ScrollReveal>
				</div>

				{/* Contact Information */}
				<ScrollReveal direction="up" delay={1.1}>
					<Card className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Clock className="w-5 h-5 mr-2" />
								Billing Support
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4">
								Our billing team is here to help with refund requests and
								billing questions:
							</p>
							<div className="space-y-2 text-sm">
								<p>
									<strong>Email:</strong> billing@amplifyai.com
								</p>
								<p>
									<strong>Response Time:</strong> 2 business days
								</p>
								<p>
									<strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM
									PST
								</p>
								<p>
									<strong>Emergency Billing:</strong> security@amplifyai.com
								</p>
							</div>
							<div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<p className="text-sm">
									<strong>Tip:</strong> Include your account email, billing
									details, and reason for refund to help us process your request
									faster.
								</p>
							</div>
						</CardContent>
					</Card>
				</ScrollReveal>
			</div>
		</div>
	);
}
