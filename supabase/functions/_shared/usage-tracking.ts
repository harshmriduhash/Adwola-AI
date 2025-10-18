import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface UsageLimits {
  posts_remaining: number;
  brands_remaining: number;
  can_generate_post: boolean;
  can_create_brand: boolean;
}

export async function checkUsageLimits(
  userId: string
): Promise<UsageLimits | null> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const { data, error } = await supabase.rpc("check_usage_limits", {
      user_uuid: userId,
    });

    if (error) {
      console.error("Error checking usage limits:", error);
      return null;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in checkUsageLimits:", error);
    return null;
  }
}

export async function incrementUsage(
  userId: string,
  usageType: "posts" | "brands" | "api_calls",
  incrementBy: number = 1
): Promise<boolean> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const { error } = await supabase.rpc("increment_usage", {
      user_uuid: userId,
      usage_type: usageType,
      increment_by: incrementBy,
    });

    if (error) {
      console.error("Error incrementing usage:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in incrementUsage:", error);
    return false;
  }
}

export async function getUserSubscription(userId: string): Promise<any> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select(
        "plan_type, status, monthly_post_limit, brand_limit, team_member_limit"
      )
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found"
      console.error("Error getting user subscription:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getUserSubscription:", error);
    return null;
  }
}

export function createUsageResponse(
  message: string,
  upgradeRequired: boolean = false
) {
  return new Response(
    JSON.stringify({
      error: message,
      code: "USAGE_LIMIT_EXCEEDED",
      upgradeRequired,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    }
  );
}
