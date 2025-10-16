"use client";

import {
	Bookmark,
	Clock,
	Copy,
	Edit,
	Plus,
	Search,
	Tag,
	Trash2,
	TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ContentTemplate {
	id: string;
	name: string;
	description: string;
	category: string;
	content: string;
	hashtags: string[];
	platforms: string[];
	created_at: string;
	usage_count: number;
	performance_score?: number;
}

interface ContentTemplatesProps {
	onApplyTemplate?: (template: ContentTemplate) => void;
	onSaveTemplate?: (
		template: Omit<ContentTemplate, "id" | "created_at" | "usage_count">,
	) => void;
}

// Mock templates data - in real app this would come from API
const mockTemplates: ContentTemplate[] = [
	{
		id: "1",
		name: "Product Launch",
		description: "Perfect for announcing new product releases with excitement",
		category: "Marketing",
		content:
			"🚀 Excited to announce our latest innovation! \n\n✨ Key features:\n• Revolutionary design that saves 50% time\n• Advanced AI integration for smarter workflows\n• Seamless cross-platform compatibility\n\nAvailable now with exclusive early-bird pricing. What do you think? 👇",
		hashtags: ["#ProductLaunch", "#Innovation", "#NewProduct", "#AI", "#Tech"],
		platforms: ["LinkedIn", "Twitter", "Facebook"],
		created_at: "2024-06-20",
		usage_count: 15,
		performance_score: 8.5,
	},
	{
		id: "2",
		name: "Behind the Scenes",
		description: "Show your audience the authentic process behind your work",
		category: "Engagement",
		content:
			"👀 Behind the scenes at AmplifyAI!\n\nOur engineering team just spent 72 hours perfecting our AI content algorithm. Every line of code is tested through 15 quality checks.\n\nIt's amazing what goes into creating content that converts. Our team works hard to deliver results that matter.\n\nWhat would you like to see more of? 💭",
		hashtags: ["#BehindTheScenes", "#TeamWork", "#Engineering", "#AI"],
		platforms: ["Instagram", "LinkedIn", "Facebook"],
		created_at: "2024-06-18",
		usage_count: 22,
		performance_score: 9.2,
	},
	{
		id: "3",
		name: "Industry Insight",
		description: "Establish thought leadership with valuable industry knowledge",
		category: "Thought Leadership",
		content:
			"💡 Industry Insight: 87% of marketers now use AI for content creation\n\nHere's what this means for business leaders:\n\n1️⃣ Traditional content creation is becoming obsolete\n2️⃣ Companies adopting AI report 3x faster campaign launches\n3️⃣ Customer engagement increases by 45% with AI-optimized content\n\nWhat's your take on this trend? Share your thoughts! 🧠",
		hashtags: ["#IndustryInsights", "#ThoughtLeadership", "#AI", "#Marketing"],
		platforms: ["LinkedIn", "Twitter"],
		created_at: "2024-06-15",
		usage_count: 8,
		performance_score: 7.8,
	},
	{
		id: "4",
		name: "Customer Success",
		description: "Showcase client wins and build social proof",
		category: "Marketing",
		content:
			"🎉 Client Success Story!\n\nTechCorp increased their social media engagement by 340% in just 30 days using our AI content platform.\n\n📊 Results:\n• 2.5M+ impressions\n• 89% increase in qualified leads\n• 60% reduction in content creation time\n\n\"AmplifyAI transformed our entire content strategy\" - Sarah Chen, CMO\n\nReady for similar results? 🚀",
		hashtags: ["#CustomerSuccess", "#Results", "#SocialMediaMarketing"],
		platforms: ["LinkedIn", "Twitter", "Facebook"],
		created_at: "2024-06-22",
		usage_count: 31,
		performance_score: 9.6,
	},
	{
		id: "5",
		name: "Educational Content",
		description: "Share knowledge and position your brand as an expert",
		category: "Educational",
		content:
			"📚 Quick Tip: The 3-2-1 Rule for Social Media Content\n\nFor every 6 posts, aim for:\n\n3️⃣ Educational posts (tips, insights, how-tos)\n2️⃣ Personal/behind-the-scenes content\n1️⃣ Promotional content about your product\n\nThis balance keeps your audience engaged while building trust. The key is providing value before asking for anything in return.\n\nWhich type of content performs best for you? 💭",
		hashtags: ["#SocialMediaTips", "#ContentStrategy", "#MarketingTips"],
		platforms: ["LinkedIn", "Instagram", "Twitter"],
		created_at: "2024-06-19",
		usage_count: 18,
		performance_score: 8.9,
	},
];

const categories = [
	"All",
	"Marketing",
	"Engagement", 
	"Thought Leadership",
	"Educational",
	"Sales",
	"Customer Success",
];

export function ContentTemplates({
	onApplyTemplate,
	onSaveTemplate,
}: ContentTemplatesProps) {
	const [templates, setTemplates] = useState<ContentTemplate[]>(mockTemplates);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [createDialogOpen, setCreateDialogOpen] = useState(false);

	// New template form state
	const [newTemplate, setNewTemplate] = useState({
		name: "",
		description: "",
		category: "",
		content: "",
		hashtags: "",
		platforms: [] as string[],
	});

	const filteredTemplates = templates.filter((template) => {
		const matchesSearch =
			template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			template.content.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || template.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const handleApplyTemplate = (template: ContentTemplate) => {
		// Update usage count
		setTemplates((prev) =>
			prev.map((t) =>
				t.id === template.id ? { ...t, usage_count: t.usage_count + 1 } : t,
			),
		);
		onApplyTemplate?.(template);
	};

	const handleCreateTemplate = () => {
		const template = {
			...newTemplate,
			hashtags: newTemplate.hashtags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean),
		};

		onSaveTemplate?.(template);

		// Add to local state (in real app, this would be handled by API response)
		const newTemplateWithId: ContentTemplate = {
			...template,
			id: Math.random().toString(36).substr(2, 9),
			created_at: new Date().toISOString().split("T")[0],
			usage_count: 0,
		};

		setTemplates((prev) => [newTemplateWithId, ...prev]);
		setCreateDialogOpen(false);
		setNewTemplate({
			name: "",
			description: "",
			category: "",
			content: "",
			hashtags: "",
			platforms: [],
		});
	};

	const handleDeleteTemplate = (templateId: string) => {
		setTemplates((prev) => prev.filter((t) => t.id !== templateId));
	};

	const getPlatformColor = (platform: string) => {
		const colors: Record<string, string> = {
			LinkedIn: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			Twitter: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
			Facebook:
				"bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
			Instagram:
				"bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
		};
		return (
			colors[platform] ||
			"bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
		);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<Bookmark className="h-5 w-5" />
						Content Templates
					</CardTitle>
					<Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-1" />
								Create Template
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl">
							<DialogHeader>
								<DialogTitle>Create New Template</DialogTitle>
								<DialogDescription>
									Create a reusable content template for your social media
									posts.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="template-name">Template Name</Label>
										<Input
											id="template-name"
											value={newTemplate.name}
											onChange={(e) =>
												setNewTemplate({ ...newTemplate, name: e.target.value })
											}
											placeholder="e.g., Product Launch"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="template-category">Category</Label>
										<Select
											onValueChange={(value) =>
												setNewTemplate({ ...newTemplate, category: value })
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
											<SelectContent>
												{categories
													.filter((cat) => cat !== "All")
													.map((category) => (
														<SelectItem key={category} value={category}>
															{category}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="template-description">Description</Label>
									<Input
										id="template-description"
										value={newTemplate.description}
										onChange={(e) =>
											setNewTemplate({
												...newTemplate,
												description: e.target.value,
											})
										}
										placeholder="Brief description of when to use this template"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="template-content">Content</Label>
									<Textarea
										id="template-content"
										value={newTemplate.content}
										onChange={(e) =>
											setNewTemplate({
												...newTemplate,
												content: e.target.value,
											})
										}
										placeholder="Write your template content here. Use [VARIABLE_NAME] for dynamic content."
										className="min-h-[100px]"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="template-hashtags">Hashtags</Label>
									<Input
										id="template-hashtags"
										value={newTemplate.hashtags}
										onChange={(e) =>
											setNewTemplate({
												...newTemplate,
												hashtags: e.target.value,
											})
										}
										placeholder="Comma-separated hashtags (without #)"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setCreateDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button
									onClick={handleCreateTemplate}
									disabled={!newTemplate.name || !newTemplate.content}
								>
									Create Template
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="flex flex-wrap gap-4 mt-4">
					<div className="relative flex-1 min-w-[200px]">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search templates..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger className="w-[180px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardHeader>

			<CardContent>
				{filteredTemplates.length === 0 ? (
					<div className="text-center py-16">
						<div className="max-w-md mx-auto">
							<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-6">
								<Bookmark className="h-16 w-16 mx-auto mb-4 text-blue-500" />
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									No templates found
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-6">
									{searchTerm || selectedCategory !== "All" 
										? "Try adjusting your search or filter to find templates" 
										: "Create your first content template to streamline your social media workflow"
									}
								</p>
								{(!searchTerm && selectedCategory === "All") && (
									<div className="space-y-4">
										<Button 
											onClick={() => setCreateDialogOpen(true)}
											className="bg-blue-600 hover:bg-blue-700 text-white"
										>
											<Plus className="h-4 w-4 mr-2" />
											Create Your First Template
										</Button>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											💡 Templates save 70% of your content creation time
										</div>
									</div>
								)}
								{(searchTerm || selectedCategory !== "All") && (
									<div className="space-y-2">
										<Button 
											variant="outline"
											onClick={() => {
												setSearchTerm("");
												setSelectedCategory("All");
											}}
											className="border-gray-200 dark:border-gray-700"
										>
											Clear Filters
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="grid gap-6">
						{filteredTemplates.map((template) => (
							<Card
								key={template.id}
								className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
							>
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-3 mb-2">
												<h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
													{template.name}
												</h3>
												<Badge 
													variant="outline" 
													className="shrink-0 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
												>
													{template.category}
												</Badge>
												{template.performance_score && (
													<Badge 
														variant="secondary" 
														className="shrink-0 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
													>
														<TrendingUp className="h-3 w-3 mr-1" />
														{template.performance_score}/10
													</Badge>
												)}
											</div>
											<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
												{template.description}
											</p>
										</div>
										<div className="flex gap-2 shrink-0">
											<Button
												size="sm"
												variant="default"
												onClick={() => handleApplyTemplate(template)}
												className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
											>
												<Copy className="h-4 w-4 mr-2" />
												Use Template
											</Button>
											<Button 
												size="sm" 
												variant="outline"
												className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleDeleteTemplate(template.id)}
												className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardHeader>

								<CardContent className="pt-0 space-y-4">
									<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
										<p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">
											{template.content.length > 200
												? `${template.content.substring(0, 200)}...`
												: template.content}
										</p>
									</div>

									<div className="flex flex-wrap gap-2">
										{template.hashtags.map((hashtag, index) => (
											<Badge
												key={index}
												variant="outline"
												className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
											>
												<Tag className="h-3 w-3 mr-1" />
												{hashtag}
											</Badge>
										))}
									</div>

									<div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
										<div className="flex flex-wrap gap-2">
											{template.platforms.map((platform) => (
												<Badge
													key={platform}
													className={`text-xs px-2 py-1 font-medium ${getPlatformColor(platform)}`}
												>
													{platform}
												</Badge>
											))}
										</div>
										<div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
											<span className="flex items-center gap-1 font-medium">
												<Copy className="h-3 w-3" />
												{template.usage_count} uses
											</span>
											<span className="flex items-center gap-1">
												<Clock className="h-3 w-3" />
												{new Date(template.created_at).toLocaleDateString()}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
