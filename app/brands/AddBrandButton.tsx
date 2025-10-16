"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// This is a simplified modal for brevity.
// In a real app, you would use a library like Shadcn/UI's Dialog.
export function AddBrandButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [tone, setTone] = useState("");
	const router = useRouter();
	const supabase = createClient();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return;

		const { error } = await supabase.from("brands").insert({
			user_id: user.id,
			brand_name: name,
			brand_description: description,
			tone_of_voice: tone,
		});

		if (!error) {
			setIsOpen(false);
			// Reset form
			setName("");
			setDescription("");
			setTone("");
			router.refresh(); // Refresh the server component to show the new brand
		} else {
			console.error("Error creating brand:", error);
		}
	};

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="btn btn-primary">
				Add New Brand
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
					<div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md animate-in">
						<h2 className="text-2xl font-bold mb-6">Create New Brand</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="text-sm font-medium">Brand Name</label>
								<input
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="e.g., AmplifyAI"
									className="w-full p-2 border rounded mt-1"
								/>
							</div>
							<div>
								<label className="text-sm font-medium">Brand Description</label>
								<textarea
									required
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="e.g., We make AI tools for marketers..."
									className="w-full p-2 border rounded mt-1 h-24"
								/>
							</div>
							<div>
								<label className="text-sm font-medium">Tone of Voice</label>
								<input
									required
									value={tone}
									onChange={(e) => setTone(e.target.value)}
									placeholder="e.g., Witty, professional, and slightly futuristic"
									className="w-full p-2 border rounded mt-1"
								/>
							</div>
							<div className="flex justify-end gap-4 pt-4">
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="btn btn-secondary"
								>
									Cancel
								</button>
								<button type="submit" className="btn btn-primary">
									Save Brand
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
