import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { ActivityFeed } from "./ActivityFeed";

export default async function ActivityPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch recent activity data
  const { data: briefs } = await supabase
    .from("content_briefs")
    .select(
      `
      *,
      brands (brand_name, logo_url),
      generated_posts (*)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch subscription activity
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Fetch usage data
  const { data: usage } = await supabase
    .from("usage_tracking")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <Sidebar>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
            Activity Feed
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your recent activity and content generation history
          </p>
        </div>

        <ActivityFeed
          briefs={briefs || []}
          subscription={subscription}
          usage={usage || []}
          userId={user.id}
        />
      </div>
    </Sidebar>
  );
}
