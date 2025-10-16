import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { ProfileManager } from "./ProfileManager";

export default async function ProfilePage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	// Get user profile data
	const { data: profile } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();

	return (
		<Sidebar>
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Profile Settings
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Manage your account information and preferences
					</p>
				</div>

				<ProfileManager user={user} profile={profile} />
			</div>
		</Sidebar>
	);
}
