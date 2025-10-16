import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { CampaignForm } from "./CampaignForm";

export default async function CampaignsPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	// Fetch data needed for the form and activity list
	const { data: brands } = await supabase
		.from("brands")
		.select("id, brand_name");
	const { data: briefs } = await supabase
		.from("content_briefs")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(5);

	return (
		<Sidebar>
			<div className="w-full animate-in flex flex-col gap-12 items-center p-8">
				<div className="w-full max-w-2xl">
					<h1 className="text-3xl font-bold mb-2">New Content Campaign</h1>
					<p className="text-foreground/80 mb-6">
						Fill out the brief below and let the AI do the heavy lifting.
					</p>
					<CampaignForm brands={brands || []} />
				</div>

				<div className="w-full max-w-4xl">
					<h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
					<div className="bg-background border rounded-lg shadow-sm">
						{briefs?.map(
							(brief: {
								id: string;
								topic: string;
								created_at: string;
								status: string;
							}) => (
								<div
									key={brief.id}
									className="p-4 border-b flex justify-between items-center"
								>
									<div>
										<p className="font-medium truncate max-w-md">
											{brief.topic}
										</p>
										<p className="text-xs text-foreground/60">
											{new Date(brief.created_at).toLocaleString()}
										</p>
									</div>
									<span
										className={`px-2 py-1 text-xs font-semibold rounded-full ${
											brief.status === "completed"
												? "bg-green-100 text-green-800"
												: brief.status === "processing"
													? "bg-blue-100 text-blue-800"
													: brief.status === "error"
														? "bg-red-100 text-red-800"
														: "bg-gray-100 text-gray-800"
										}`}
									>
										{brief.status}
									</span>
								</div>
							),
						)}
						{(!briefs || briefs.length === 0) && (
							<p className="text-center text-foreground/60 p-8">
								No campaigns created yet.
							</p>
						)}
					</div>
				</div>
			</div>
		</Sidebar>
	);
}
