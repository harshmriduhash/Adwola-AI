import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { SettingsManager } from "./SettingsManager";

export default async function SettingsPage({
	searchParams,
}: {
	searchParams: Promise<{
		tab?: string;
		connection?: string;
		status?: string;
		message?: string;
		success?: string;
		canceled?: string;
	}>;
}) {
	const params = await searchParams;
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	const { data: connections } = await supabase
		.from("social_connections")
		.select("*")
		.eq("user_id", user.id);

	// Get user profile data
	const { data: profile } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();

	// Get subscription data
	const { data: subscription } = await supabase
		.from("subscriptions")
		.select("*")
		.eq("user_id", user.id)
		.single();

	return (
		<Sidebar>
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Settings
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Manage your account, preferences, and integrations
					</p>
				</div>

				<SettingsManager
					initialConnections={connections || []}
					searchParams={params}
					user={user}
					profile={profile}
					subscription={subscription}
				/>
			</div>
		</Sidebar>
	);
}
