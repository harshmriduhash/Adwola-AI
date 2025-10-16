"use client";

import { AlertCircle, CreditCard, Download, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BillingRecord {
	id: string;
	created_at: string;
	amount_cents: number;
	currency: string;
	status: "paid" | "failed" | "pending" | "refunded";
	plan_type: string;
	description: string;
	stripe_invoice_id?: string;
	billing_period_start?: string;
	billing_period_end?: string;
}

interface BillingHistoryProps {
	billingHistory: BillingRecord[];
	onDownloadInvoice?: (invoiceId: string) => void;
}

export function BillingHistory({
	billingHistory,
	onDownloadInvoice,
}: BillingHistoryProps) {
	const formatCurrency = (amountCents: number, currency: string = "usd") => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency.toUpperCase(),
		}).format(amountCents / 100);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const getStatusBadge = (status: string) => {
		const statusConfig = {
			paid: {
				variant: "default" as const,
				icon: CreditCard,
				text: "Paid",
				className: "bg-green-100 text-green-800",
			},
			failed: {
				variant: "destructive" as const,
				icon: AlertCircle,
				text: "Failed",
				className: "bg-red-100 text-red-800",
			},
			pending: {
				variant: "secondary" as const,
				icon: Receipt,
				text: "Pending",
				className: "bg-yellow-100 text-yellow-800",
			},
			refunded: {
				variant: "outline" as const,
				icon: Receipt,
				text: "Refunded",
				className: "bg-gray-100 text-gray-800",
			},
		};

		const config =
			statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
		const Icon = config.icon;

		return (
			<Badge variant={config.variant} className={config.className}>
				<Icon className="w-3 h-3 mr-1" />
				{config.text}
			</Badge>
		);
	};

	if (billingHistory.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Receipt className="w-5 h-5 mr-2" />
						Billing History
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-8">
						<Receipt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
						<p className="text-gray-500">No billing history available</p>
						<p className="text-sm text-gray-400 mt-1">
							Your payment history will appear here once you upgrade to a paid
							plan
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center">
						<Receipt className="w-5 h-5 mr-2" />
						Billing History
					</div>
					<Badge variant="outline">
						{billingHistory.length} record
						{billingHistory.length !== 1 ? "s" : ""}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{billingHistory.map((record) => (
						<div
							key={record.id}
							className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
						>
							<div className="flex-1">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center">
										<p className="font-medium text-sm">
											{record.description || `${record.plan_type} plan`}
										</p>
										<span className="ml-2 text-sm text-gray-500 capitalize">
											({record.plan_type})
										</span>
									</div>
									{getStatusBadge(record.status)}
								</div>

								<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
									<div>
										<span className="font-medium">Amount: </span>
										{formatCurrency(record.amount_cents, record.currency)}
									</div>
									<div>
										<span className="font-medium">Date: </span>
										{formatDate(record.created_at)}
									</div>

									{record.billing_period_start && record.billing_period_end && (
										<>
											<div className="col-span-2">
												<span className="font-medium">Billing Period: </span>
												{formatDate(record.billing_period_start)} -{" "}
												{formatDate(record.billing_period_end)}
											</div>
										</>
									)}
								</div>
							</div>

							{record.stripe_invoice_id && onDownloadInvoice && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => onDownloadInvoice(record.stripe_invoice_id!)}
									className="ml-4"
								>
									<Download className="w-4 h-4 mr-1" />
									Invoice
								</Button>
							)}
						</div>
					))}
				</div>

				{/* Summary */}
				<div className="mt-6 pt-4 border-t">
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span className="text-gray-600">Total Paid:</span>
							<p className="font-medium text-lg">
								{formatCurrency(
									billingHistory
										.filter((record) => record.status === "paid")
										.reduce((sum, record) => sum + record.amount_cents, 0),
								)}
							</p>
						</div>
						<div>
							<span className="text-gray-600">Failed Payments:</span>
							<p className="font-medium text-lg">
								{
									billingHistory.filter((record) => record.status === "failed")
										.length
								}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
