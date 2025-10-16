import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { BrandsManager } from "./BrandsManager";

export default async function BrandsPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	const { data: brands } = await supabase
		.from("brands")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	return (
		<Sidebar>
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Brand Management
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Manage your brand guidelines to ensure consistent AI-generated
						content
					</p>
				</div>

				<BrandsManager initialBrands={brands || []} />
			</div>
		</Sidebar>
	);
}
