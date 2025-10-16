"use client";

import {
	ArrowRight,
	Building2,
	CheckCircle,
	Clock,
	Loader2,
	MessageSquare,
	Sparkles,
	Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type Brand = {
	id: string;
	brand_name: string;
	brand_description?: string;
	tone_of_voice?: string;
};

interface CampaignFormProps {
	brands: Brand[];
}

export function CampaignForm({ brands }: CampaignFormProps) {
	const [brandId, setBrandId] = useState(brands[0]?.id || "");
	const [topic, setTopic] = useState("");
	const [goal, setGoal] = useState("Generate buzz and engagement");
	const [cta, setCta] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [createdBriefId, setCreatedBriefId] = useState<string | null>(null);
	const [realTimeStatus, setRealTimeStatus] = useState<{
		status: string;
		posts_generated: number;
	} | null>(null);

	const router = useRouter();
	const supabase = createClient();

	// Set up real-time subscription for the created brief
	useEffect(() => {
		if (!createdBriefId) return;

		const channel = supabase
			.channel(`brief_${createdBriefId}`)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "content_briefs",
					filter: `id=eq.${createdBriefId}`,
				},
				(payload) => {
					setRealTimeStatus({
						status: payload.new.status,
						posts_generated: 0, // We'll update this separately
					});

					if (payload.new.status === "completed") {
						toast.success(
							"🎉 Campaign completed! Your content is ready for review.",
						);
						// Redirect to dashboard after a delay
						setTimeout(() => {
							router.push(`/dashboard/brief/${createdBriefId}`);
						}, 2000);
					} else if (payload.new.status === "error") {
						toast.error("❌ Campaign generation failed. Please try again.");
					}
				},
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [createdBriefId, supabase, router]);

	const selectedBrand = brands.find((b) => b.id === brandId);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!brandId) {
			toast.error("Please select a brand before creating a campaign");
			return;
		}

		if (!topic.trim()) {
			toast.error("Please enter a campaign topic");
			return;
		}

		setIsLoading(true);

		try {
			const { data, error } = await supabase.functions.invoke("create-brief", {
				body: { brandId, topic, goal, cta },
			});

			if (error) throw error;

			setCreatedBriefId(data.brief_id);
			setRealTimeStatus({ status: "processing", posts_generated: 0 });

			toast.success("🚀 Campaign started! Generating your content...");

			// Reset form but keep it visible for status updates
			setTopic("");
			setCta("");
		} catch (error: unknown) {
			const errorMsg =
				error instanceof Error ? error.message : "An unknown error occurred";
			toast.error(`Failed to create campaign: ${errorMsg}`);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreateAnother = () => {
		setCreatedBriefId(null);
		setRealTimeStatus(null);
		setTopic("");
		setCta("");
	};

	if (createdBriefId && realTimeStatus) {
		return (
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="flex items-center justify-center gap-2">
						{realTimeStatus.status === "processing" ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin text-blue-500" />
								Generating Content...
							</>
						) : realTimeStatus.status === "completed" ? (
							<>
								<CheckCircle className="w-5 h-5 text-green-500" />
								Campaign Complete!
							</>
						) : (
							<>
								<Clock className="w-5 h-5 text-yellow-500" />
								{realTimeStatus.status}
							</>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent className="text-center space-y-4">
					<Badge variant="outline" className="text-lg py-2 px-4">
						Status: {realTimeStatus.status}
					</Badge>

					{realTimeStatus.status === "processing" && (
						<div className="space-y-2">
							<p className="text-muted-foreground">
								Our AI is crafting engaging content for your brand...
							</p>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-500 h-2 rounded-full animate-pulse"
									style={{ width: "60%" }}
								></div>
							</div>
						</div>
					)}

					{realTimeStatus.status === "completed" && (
						<div className="space-y-4">
							<p className="text-green-600 font-medium">
								🎉 Your content campaign is ready for review!
							</p>
							<div className="flex gap-2 justify-center">
								<Button asChild>
									<a href={`/dashboard/brief/${createdBriefId}`}>
										View & Edit Content <ArrowRight className="w-4 h-4 ml-1" />
									</a>
								</Button>
								<Button variant="outline" onClick={handleCreateAnother}>
									Create Another Campaign
								</Button>
							</div>
						</div>
					)}

					{realTimeStatus.status === "error" && (
						<div className="space-y-4">
							<p className="text-red-600">
								❌ Something went wrong. Please try again.
							</p>
							<Button onClick={handleCreateAnother}>Try Again</Button>
						</div>
					)}
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Sparkles className="w-5 h-5 text-purple-500" />
					Create New Campaign
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Brand Selection */}
					<div className="space-y-2">
						<Label htmlFor="brand" className="flex items-center gap-2">
							<Building2 className="w-4 h-4" />
							Select Brand *
						</Label>
						<select
							id="brand"
							value={brandId}
							onChange={(e) => setBrandId(e.target.value)}
							className="w-full p-2 border rounded-md"
							required
						>
							<option value="">Choose a brand...</option>
							{brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.brand_name}
								</option>
							))}
						</select>
						{selectedBrand && (
							<div className="p-3 bg-muted rounded-md text-sm">
								<p>
									<strong>Description:</strong>{" "}
									{selectedBrand.brand_description}
								</p>
								<p>
									<strong>Tone:</strong> {selectedBrand.tone_of_voice}
								</p>
							</div>
						)}
					</div>

					{/* Campaign Topic */}
					<div className="space-y-2">
						<Label htmlFor="topic" className="flex items-center gap-2">
							<MessageSquare className="w-4 h-4" />
							Campaign Topic *
						</Label>
						<Input
							id="topic"
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
							placeholder="e.g., Launch our new eco-friendly product line"
							required
						/>
					</div>

					{/* Campaign Goal */}
					<div className="space-y-2">
						<Label htmlFor="goal" className="flex items-center gap-2">
							<Target className="w-4 h-4" />
							Campaign Goal
						</Label>
						<select
							id="goal"
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
							className="w-full p-2 border rounded-md"
						>
							<option value="Generate buzz and engagement">
								Generate buzz and engagement
							</option>
							<option value="Drive website traffic">
								Drive website traffic
							</option>
							<option value="Increase brand awareness">
								Increase brand awareness
							</option>
							<option value="Generate leads">Generate leads</option>
							<option value="Promote product launch">
								Promote product launch
							</option>
							<option value="Build community">Build community</option>
							<option value="Share industry insights">
								Share industry insights
							</option>
						</select>
					</div>

					{/* Call to Action */}
					<div className="space-y-2">
						<Label htmlFor="cta">Call to Action (Optional)</Label>
						<Input
							id="cta"
							value={cta}
							onChange={(e) => setCta(e.target.value)}
							placeholder="e.g., Visit our website, Sign up for updates"
						/>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						disabled={isLoading || !brandId || !topic.trim()}
						className="w-full"
						size="lg"
					>
						{isLoading ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Generating Campaign...
							</>
						) : (
							<>
								<Sparkles className="w-4 h-4 mr-2" />
								Generate AI Campaign
							</>
						)}
					</Button>

					{brands.length === 0 && (
						<div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
							<p className="text-sm text-yellow-600 dark:text-yellow-400">
								You need to create a brand first before generating campaigns.
							</p>
							<Button variant="outline" size="sm" className="mt-2" asChild>
								<a href="/brands">Create Your First Brand</a>
							</Button>
						</div>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
