"use client";

import {
	AlertCircle,
	Building2,
	Crown,
	Edit,
	FileText,
	Palette,
	Plus,
	Save,
	Trash2,
	Upload,
	X,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCanCreateContent } from "@/hooks/useUsageLimits";
import {
	enforceUsageLimit,
	UsageLimitError,
} from "@/lib/subscription/usage-limits";
import { createClient } from "@/lib/supabase/client";

interface Brand {
	id: string;
	brand_name: string;
	brand_description: string;
	tone_of_voice: string;
	logo_url?: string;
	created_at: string;
}

interface BrandsManagerProps {
	initialBrands: Brand[];
}

// Extract BrandForm component outside to prevent recreation
interface BrandFormProps {
	isEditing?: boolean;
	brandName: string;
	brandDescription: string;
	toneOfVoice: string;
	logoUrl: string;
	onBrandNameChange: (value: string) => void;
	onBrandDescriptionChange: (value: string) => void;
	onToneOfVoiceChange: (value: string) => void;
	onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
	isLoading: boolean;
}

const BrandForm = memo<BrandFormProps>(
	({
		isEditing = false,
		brandName,
		brandDescription,
		toneOfVoice,
		logoUrl,
		onBrandNameChange,
		onBrandDescriptionChange,
		onToneOfVoiceChange,
		onLogoUpload,
		onSubmit,
		onCancel,
		isLoading,
	}) => (
		<form onSubmit={onSubmit} className="space-y-4">
			<div>
				<Label htmlFor={`brand_name_${isEditing ? "edit" : "add"}`}>
					Brand Name *
				</Label>
				<Input
					id={`brand_name_${isEditing ? "edit" : "add"}`}
					type="text"
					value={brandName}
					onChange={(e) => onBrandNameChange(e.target.value)}
					placeholder="Enter brand name"
					required
					autoComplete="off"
				/>
			</div>

			<div>
				<Label htmlFor={`brand_description_${isEditing ? "edit" : "add"}`}>
					Brand Description *
				</Label>
				<Textarea
					id={`brand_description_${isEditing ? "edit" : "add"}`}
					value={brandDescription}
					onChange={(e) => onBrandDescriptionChange(e.target.value)}
					placeholder="Describe your brand, its mission, values, and what makes it unique..."
					rows={3}
					required
					autoComplete="off"
				/>
			</div>

			<div>
				<Label htmlFor={`tone_of_voice_${isEditing ? "edit" : "add"}`}>
					Tone of Voice *
				</Label>
				<Textarea
					id={`tone_of_voice_${isEditing ? "edit" : "add"}`}
					value={toneOfVoice}
					onChange={(e) => onToneOfVoiceChange(e.target.value)}
					placeholder="Describe the tone and style for your brand's communication (e.g., friendly, professional, witty, authoritative...)"
					rows={3}
					required
					autoComplete="off"
				/>
			</div>

			<div>
				<Label htmlFor={`logo_upload_${isEditing ? "edit" : "add"}`}>
					Brand Logo (Optional)
				</Label>
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Input
							id={`logo_upload_${isEditing ? "edit" : "add"}`}
							type="file"
							accept="image/*"
							onChange={onLogoUpload}
							className="flex-1"
						/>
						<Button type="button" variant="outline" size="sm">
							<Upload className="w-4 h-4" />
						</Button>
					</div>
					{logoUrl && (
						<div className="flex items-center gap-2">
							<Image
								src={logoUrl}
								alt="Logo preview"
								width={32}
								height={32}
								className="w-8 h-8 rounded object-cover"
							/>
							<span className="text-sm text-green-600">Logo uploaded</span>
						</div>
					)}
				</div>
			</div>

			<div className="flex gap-2 pt-4">
				<Button type="submit" disabled={isLoading}>
					<Save className="w-4 h-4 mr-2" />
					{isLoading ? "Saving..." : isEditing ? "Update Brand" : "Add Brand"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					<X className="w-4 h-4 mr-2" />
					Cancel
				</Button>
			</div>
		</form>
	),
);

BrandForm.displayName = "BrandForm";

// Memoized Brand Card component
const BrandCard = memo<{
	brand: Brand;
	onEdit: (brand: Brand) => void;
	onDelete: (brandId: string) => void;
}>(({ brand, onEdit, onDelete }) => (
	<Card className="hover:shadow-md transition-shadow">
		<CardHeader>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					{brand.logo_url && (
						<Image
							src={brand.logo_url}
							alt={`${brand.brand_name} logo`}
							width={40}
							height={40}
							className="w-10 h-10 rounded-lg object-cover"
						/>
					)}
					<div>
						<CardTitle className="text-lg">{brand.brand_name}</CardTitle>
						<p className="text-sm text-gray-500">
							Created {new Date(brand.created_at).toLocaleDateString()}
						</p>
					</div>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={() => onEdit(brand)}>
						<Edit className="w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onDelete(brand.id)}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<FileText className="w-4 h-4 text-gray-500" />
						<span className="text-sm font-medium text-gray-700">
							Description
						</span>
					</div>
					<p className="text-sm text-gray-600">{brand.brand_description}</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-1">
						<Palette className="w-4 h-4 text-gray-500" />
						<span className="text-sm font-medium text-gray-700">
							Tone of Voice
						</span>
					</div>
					<p className="text-sm text-gray-600">{brand.tone_of_voice}</p>
				</div>
			</div>
		</CardContent>
	</Card>
));

BrandCard.displayName = "BrandCard";

export function BrandsManager({ initialBrands }: BrandsManagerProps) {
	const [brands, setBrands] = useState<Brand[]>(initialBrands);
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingBrand, setEditingBrand] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Form states with stable initial values - using useCallback for updates
	const [brandName, setBrandName] = useState("");
	const [brandDescription, setBrandDescription] = useState("");
	const [toneOfVoice, setToneOfVoice] = useState("");
	const [logoUrl, setLogoUrl] = useState("");

	const supabase = createClient();
	const { canCreateBrand, brandsRemaining, planType, brandLimit } =
		useCanCreateContent();

	// Memoized callback functions to prevent recreation
	const resetForm = useCallback(() => {
		setBrandName("");
		setBrandDescription("");
		setToneOfVoice("");
		setLogoUrl("");
	}, []);

	const getCurrentFormData = useCallback(
		() => ({
			brand_name: brandName,
			brand_description: brandDescription,
			tone_of_voice: toneOfVoice,
			logo_url: logoUrl,
		}),
		[brandName, brandDescription, toneOfVoice, logoUrl],
	);

	// Stable event handlers with useCallback
	const handleBrandNameChange = useCallback((value: string) => {
		setBrandName(value);
	}, []);

	const handleBrandDescriptionChange = useCallback((value: string) => {
		setBrandDescription(value);
	}, []);

	const handleToneOfVoiceChange = useCallback((value: string) => {
		setToneOfVoice(value);
	}, []);

	const handleAddBrand = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setIsLoading(true);

			try {
				// Check usage limits before creating brand
				await enforceUsageLimit("brand");

				const formData = getCurrentFormData();
				const { data, error } = await supabase
					.from("brands")
					.insert([formData])
					.select()
					.single();

				if (error) throw error;

				setBrands((prev) => [data, ...prev]);
				setShowAddForm(false);
				resetForm();
				toast.success("Brand added successfully!");
			} catch (error: unknown) {
				if (error instanceof UsageLimitError) {
					toast.error(error.message, {
						action: error.upgradeRequired
							? {
									label: "Upgrade Plan",
									onClick: () =>
										(window.location.href = "/dashboard/settings?tab=billing"),
								}
							: undefined,
					});
				} else {
					toast.error(
						`Failed to add brand: ${error instanceof Error ? error.message : "Unknown error"}`,
					);
				}
			} finally {
				setIsLoading(false);
			}
		},
		[getCurrentFormData, supabase, resetForm],
	);

	const handleEditBrand = useCallback((brand: Brand) => {
		setEditingBrand(brand.id);
		setBrandName(brand.brand_name);
		setBrandDescription(brand.brand_description);
		setToneOfVoice(brand.tone_of_voice);
		setLogoUrl(brand.logo_url || "");
	}, []);

	const handleUpdateBrand = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!editingBrand) return;

			setIsLoading(true);

			try {
				const formData = getCurrentFormData();
				const { error } = await supabase
					.from("brands")
					.update(formData)
					.eq("id", editingBrand);

				if (error) throw error;

				setBrands((prev) =>
					prev.map((brand) =>
						brand.id === editingBrand ? { ...brand, ...formData } : brand,
					),
				);

				setEditingBrand(null);
				resetForm();
				toast.success("Brand updated successfully!");
			} catch (error: unknown) {
				toast.error(
					`Failed to update brand: ${error instanceof Error ? error.message : "Unknown error"}`,
				);
			} finally {
				setIsLoading(false);
			}
		},
		[editingBrand, getCurrentFormData, supabase, resetForm],
	);

	const handleDeleteBrand = useCallback(
		async (brandId: string) => {
			if (
				!confirm(
					"Are you sure you want to delete this brand? This action cannot be undone.",
				)
			) {
				return;
			}

			try {
				const { error } = await supabase
					.from("brands")
					.delete()
					.eq("id", brandId);

				if (error) throw error;

				setBrands((prev) => prev.filter((brand) => brand.id !== brandId));
				toast.success("Brand deleted successfully!");
			} catch (error: unknown) {
				toast.error(
					`Failed to delete brand: ${error instanceof Error ? error.message : "Unknown error"}`,
				);
			}
		},
		[supabase],
	);

	const handleLogoUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;

			// Basic validation
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				toast.error("Image size should be less than 5MB");
				return;
			}

			setIsLoading(true);

			try {
				// Generate unique filename
				const fileExt = file.name.split(".").pop();
				const fileName = `${Math.random()}.${fileExt}`;
				const filePath = `brand-logos/${fileName}`;

				// Upload to Supabase Storage
				const { error: uploadError } = await supabase.storage
					.from("brand-assets")
					.upload(filePath, file);

				if (uploadError) throw uploadError;

				// Get public URL
				const {
					data: { publicUrl },
				} = supabase.storage.from("brand-assets").getPublicUrl(filePath);

				setLogoUrl(publicUrl);
				toast.success("Logo uploaded successfully!");
			} catch (error: unknown) {
				toast.error(
					`Failed to upload logo: ${error instanceof Error ? error.message : "Unknown error"}`,
				);
			} finally {
				setIsLoading(false);
			}
		},
		[supabase],
	);

	const handleCancelEdit = useCallback(() => {
		setEditingBrand(null);
		setShowAddForm(false);
		resetForm();
	}, [resetForm]);

	const handleShowAddForm = useCallback(() => {
		setShowAddForm(true);
		setEditingBrand(null);
		resetForm();
	}, [resetForm]);

	return (
		<div className="space-y-6">
			{/* Usage Display */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex items-center">
								<Building2 className="w-5 h-5 mr-2 text-gray-600" />
								<span className="text-sm font-medium">
									Brands: {brands.length}/{brandLimit === -1 ? "∞" : brandLimit}
								</span>
							</div>
							{planType !== "free" && (
								<Badge variant="secondary" className="capitalize">
									<Crown className="w-3 h-3 mr-1" />
									{planType}
								</Badge>
							)}
						</div>
						<div className="text-sm text-gray-600">
							{brandsRemaining > 0 || brandLimit === -1
								? `${brandLimit === -1 ? "Unlimited" : brandsRemaining} remaining`
								: "Limit reached"}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Usage Limit Warning */}
			{!canCreateBrand && (
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						You&apos;ve reached your brand limit of {brandLimit}.
						{planType === "free" && (
							<span>
								{" "}
								<a href="/dashboard/settings?tab=billing" className="underline">
									Upgrade your plan
								</a>{" "}
								to create more brands.
							</span>
						)}
					</AlertDescription>
				</Alert>
			)}

			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
						Brand Management
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Create and manage your brand identities for content generation
					</p>
				</div>
				<Button
					onClick={handleShowAddForm}
					disabled={!canCreateBrand}
					className="flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Brand
				</Button>
			</div>

			{/* Add Brand Form */}
			{showAddForm && (
				<Card>
					<CardHeader>
						<CardTitle>Add New Brand</CardTitle>
					</CardHeader>
					<CardContent>
						<BrandForm
							isEditing={false}
							brandName={brandName}
							brandDescription={brandDescription}
							toneOfVoice={toneOfVoice}
							logoUrl={logoUrl}
							onBrandNameChange={handleBrandNameChange}
							onBrandDescriptionChange={handleBrandDescriptionChange}
							onToneOfVoiceChange={handleToneOfVoiceChange}
							onLogoUpload={handleLogoUpload}
							onSubmit={handleAddBrand}
							onCancel={handleCancelEdit}
							isLoading={isLoading}
						/>
					</CardContent>
				</Card>
			)}

			{/* Brands Grid */}
			{brands.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Building2 className="h-12 w-12 text-gray-400 mb-4" />
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
							No brands yet
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-center mb-4">
							Create your first brand to start generating personalized content
						</p>
						<Button onClick={handleShowAddForm} disabled={!canCreateBrand}>
							<Plus className="w-4 h-4 mr-2" />
							Create Your First Brand
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6">
					{brands.map((brand) => {
						// Show edit form for the editing brand
						if (editingBrand === brand.id) {
							return (
								<Card key={brand.id}>
									<CardHeader>
										<CardTitle>Edit Brand</CardTitle>
									</CardHeader>
									<CardContent>
										<BrandForm
											isEditing={true}
											brandName={brandName}
											brandDescription={brandDescription}
											toneOfVoice={toneOfVoice}
											logoUrl={logoUrl}
											onBrandNameChange={handleBrandNameChange}
											onBrandDescriptionChange={handleBrandDescriptionChange}
											onToneOfVoiceChange={handleToneOfVoiceChange}
											onLogoUpload={handleLogoUpload}
											onSubmit={handleUpdateBrand}
											onCancel={handleCancelEdit}
											isLoading={isLoading}
										/>
									</CardContent>
								</Card>
							);
						}

						// Show brand card
						return (
							<BrandCard
								key={brand.id}
								brand={brand}
								onEdit={handleEditBrand}
								onDelete={handleDeleteBrand}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
