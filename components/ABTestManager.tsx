"use client";

import {
	BarChart3,
	Eye,
	MessageCircle,
	Pause,
	Play,
	Plus,
	Target,
	Trophy,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

interface ABTest {
	id: string;
	test_name: string;
	test_type: string;
	variant_a: Record<string, unknown>;
	variant_b: Record<string, unknown>;
	status: "draft" | "running" | "completed" | "cancelled";
	variant_a_performance: Record<string, unknown>;
	variant_b_performance: Record<string, unknown>;
	winner: string | null;
	confidence_level: number;
	started_at: string | null;
	completed_at: string | null;
	target_duration: string;
	created_at: string;
}

interface TestVariant {
	content: string;
	hashtags?: string[];
	posting_time?: string;
	cta?: string;
	image_style?: string;
}

export default function ABTestManager() {
	const [tests, setTests] = useState<ABTest[]>([]);
	const [loading, setLoading] = useState(true);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	// Create test form state
	const [testName, setTestName] = useState("");
	const [testType, setTestType] = useState("");
	const [variantA, setVariantA] = useState<TestVariant>({ content: "" });
	const [variantB, setVariantB] = useState<TestVariant>({ content: "" });
	const [targetDuration, setTargetDuration] = useState("7");

	const supabase = createClient();

	useEffect(() => {
		fetchTests();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const fetchTests = async () => {
		try {
			setLoading(true);

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const { data, error } = await supabase
				.from("ab_tests")
				.select("*")
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });

			if (error) {
				console.error("Error fetching A/B tests:", error);
				toast.error("Failed to fetch A/B tests");
				return;
			}

			setTests(data || []);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to load A/B tests");
		} finally {
			setLoading(false);
		}
	};

	const createTest = async () => {
		try {
			setIsCreating(true);

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			if (!testName || !testType || !variantA.content || !variantB.content) {
				toast.error("Please fill in all required fields");
				return;
			}

			const { error } = await supabase
				.from("ab_tests")
				.insert({
					user_id: user.id,
					test_name: testName,
					test_type: testType,
					variant_a: variantA,
					variant_b: variantB,
					target_duration: `${targetDuration} days`,
					status: "draft",
				})
				.select()
				.single();

			if (error) {
				console.error("Error creating test:", error);
				toast.error("Failed to create A/B test");
				return;
			}

			toast.success("A/B test created successfully!");
			await fetchTests();

			// Reset form
			setTestName("");
			setTestType("");
			setVariantA({ content: "" });
			setVariantB({ content: "" });
			setTargetDuration("7");
			setIsCreateDialogOpen(false);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to create test");
		} finally {
			setIsCreating(false);
		}
	};

	const startTest = async (testId: string) => {
		try {
			const { error } = await supabase
				.from("ab_tests")
				.update({
					status: "running",
					started_at: new Date().toISOString(),
				})
				.eq("id", testId);

			if (error) throw error;

			toast.success("A/B test started!");
			await fetchTests();
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to start test");
		}
	};

	const pauseTest = async (testId: string) => {
		try {
			const { error } = await supabase
				.from("ab_tests")
				.update({ status: "cancelled" })
				.eq("id", testId);

			if (error) throw error;

			toast.success("A/B test paused");
			await fetchTests();
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to pause test");
		}
	};

	const getStatusBadge = (status: string) => {
		const statusConfig = {
			draft: { variant: "secondary" as const, label: "Draft" },
			running: { variant: "default" as const, label: "Running" },
			completed: { variant: "outline" as const, label: "Completed" },
			cancelled: { variant: "destructive" as const, label: "Cancelled" },
		};

		const config =
			statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
		return <Badge variant={config.variant}>{config.label}</Badge>;
	};

	const getTestTypeIcon = (type: string) => {
		switch (type) {
			case "content_style":
				return <MessageCircle className="h-4 w-4" />;
			case "posting_time":
				return <Eye className="h-4 w-4" />;
			case "hashtags":
				return <Target className="h-4 w-4" />;
			case "cta":
				return <Users className="h-4 w-4" />;
			default:
				return <BarChart3 className="h-4 w-4" />;
		}
	};

	const calculateProgress = (test: ABTest) => {
		if (test.status !== "running" || !test.started_at) return 0;

		const startDate = new Date(test.started_at);
		const now = new Date();
		const targetDays = parseInt(test.target_duration.split(" ")[0]);
		const elapsedDays =
			(now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

		return Math.min((elapsedDays / targetDays) * 100, 100);
	};

	const getWinnerDisplay = (test: ABTest) => {
		if (!test.winner) return null;

		const winner = test.winner === "variant_a" ? "Variant A" : "Variant B";
		const confidence = Math.round(test.confidence_level * 100);

		return (
			<div className="flex items-center gap-2">
				<Trophy className="h-4 w-4 text-yellow-500" />
				<span className="font-medium">{winner} wins</span>
				<Badge variant="outline">{confidence}% confidence</Badge>
			</div>
		);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">A/B Testing</h2>
					<p className="text-gray-600">
						Test and optimize your content performance
					</p>
				</div>

				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className="flex items-center gap-2">
							<Plus className="h-4 w-4" />
							Create Test
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Create A/B Test</DialogTitle>
							<DialogDescription>
								Set up a new A/B test to optimize your content performance
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="test-name">Test Name</Label>
									<Input
										id="test-name"
										placeholder="e.g., CTA Button Test"
										value={testName}
										onChange={(e) => setTestName(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="test-type">Test Type</Label>
									<Select value={testType} onValueChange={setTestType}>
										<SelectTrigger>
											<SelectValue placeholder="Select test type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="content_style">
												Content Style
											</SelectItem>
											<SelectItem value="posting_time">Posting Time</SelectItem>
											<SelectItem value="hashtags">Hashtags</SelectItem>
											<SelectItem value="cta">Call to Action</SelectItem>
											<SelectItem value="image_style">Image Style</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="variant-a">Variant A Content</Label>
									<Textarea
										id="variant-a"
										placeholder="Enter content for variant A..."
										value={variantA.content}
										onChange={(e) =>
											setVariantA({ ...variantA, content: e.target.value })
										}
										rows={4}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="variant-b">Variant B Content</Label>
									<Textarea
										id="variant-b"
										placeholder="Enter content for variant B..."
										value={variantB.content}
										onChange={(e) =>
											setVariantB({ ...variantB, content: e.target.value })
										}
										rows={4}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="duration">Test Duration (days)</Label>
								<Select
									value={targetDuration}
									onValueChange={setTargetDuration}
								>
									<SelectTrigger className="w-32">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="3">3 days</SelectItem>
										<SelectItem value="7">7 days</SelectItem>
										<SelectItem value="14">14 days</SelectItem>
										<SelectItem value="30">30 days</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={() => setIsCreateDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button onClick={createTest} disabled={isCreating}>
									{isCreating ? "Creating..." : "Create Test"}
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Tests List */}
			{tests.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No A/B tests yet
						</h3>
						<p className="text-gray-600 text-center mb-4">
							Create your first A/B test to optimize your content performance
						</p>
						<Button onClick={() => setIsCreateDialogOpen(true)}>
							Create Your First Test
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6">
					{tests.map((test) => (
						<Card key={test.id}>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										{getTestTypeIcon(test.test_type)}
										<div>
											<CardTitle className="text-lg">
												{test.test_name}
											</CardTitle>
											<CardDescription className="capitalize">
												{test.test_type.replace("_", " ")} test
											</CardDescription>
										</div>
									</div>
									<div className="flex items-center gap-2">
										{getStatusBadge(test.status)}
										{test.status === "draft" && (
											<Button
												size="sm"
												onClick={() => startTest(test.id)}
												className="flex items-center gap-1"
											>
												<Play className="h-3 w-3" />
												Start
											</Button>
										)}
										{test.status === "running" && (
											<Button
												size="sm"
												variant="outline"
												onClick={() => pauseTest(test.id)}
												className="flex items-center gap-1"
											>
												<Pause className="h-3 w-3" />
												Pause
											</Button>
										)}
									</div>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								{test.status === "running" && (
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Test Progress</span>
											<span>{Math.round(calculateProgress(test))}%</span>
										</div>
										<Progress value={calculateProgress(test)} className="h-2" />
									</div>
								)}

								{test.status === "completed" && test.winner && (
									<div className="p-3 bg-green-50 rounded-lg">
										{getWinnerDisplay(test)}
									</div>
								)}

								<Tabs defaultValue="variants" className="w-full">
									<TabsList>
										<TabsTrigger value="variants">Variants</TabsTrigger>
										{(test.status === "running" ||
											test.status === "completed") && (
											<TabsTrigger value="results">Results</TabsTrigger>
										)}
									</TabsList>

									<TabsContent value="variants" className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div className="border rounded-lg p-4">
												<h4 className="font-medium mb-2">Variant A</h4>
												<p className="text-sm text-gray-600">
													{String(test.variant_a.content || "")}
												</p>
											</div>
											<div className="border rounded-lg p-4">
												<h4 className="font-medium mb-2">Variant B</h4>
												<p className="text-sm text-gray-600">
													{String(test.variant_b.content || "")}
												</p>
											</div>
										</div>
									</TabsContent>

									{(test.status === "running" ||
										test.status === "completed") && (
										<TabsContent value="results" className="space-y-4">
											<div className="grid grid-cols-2 gap-4">
												<div className="border rounded-lg p-4">
													<h4 className="font-medium mb-3">
														Variant A Performance
													</h4>
													<div className="space-y-2 text-sm">
														<div className="flex justify-between">
															<span>Engagement Rate:</span>
															<span>
																{(
																	Number(
																		test.variant_a_performance
																			?.engagement_rate || 0,
																	) * 100
																).toFixed(1)}
																%
															</span>
														</div>
														<div className="flex justify-between">
															<span>Performance Score:</span>
															<span>
																{Number(
																	test.variant_a_performance
																		?.performance_score || 0,
																)}
																/100
															</span>
														</div>
													</div>
												</div>

												<div className="border rounded-lg p-4">
													<h4 className="font-medium mb-3">
														Variant B Performance
													</h4>
													<div className="space-y-2 text-sm">
														<div className="flex justify-between">
															<span>Engagement Rate:</span>
															<span>
																{(
																	Number(
																		test.variant_b_performance
																			?.engagement_rate || 0,
																	) * 100
																).toFixed(1)}
																%
															</span>
														</div>
														<div className="flex justify-between">
															<span>Performance Score:</span>
															<span>
																{Number(
																	test.variant_b_performance
																		?.performance_score || 0,
																)}
																/100
															</span>
														</div>
													</div>
												</div>
											</div>
										</TabsContent>
									)}
								</Tabs>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
