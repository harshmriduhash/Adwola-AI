import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/lib/supabase/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient(req, res);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const facebookAuthURL = "https://www.facebook.com/v12.0/dialog/oauth";
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID ?? "",
    redirect_uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/facebook-callback`,
    state: session.access_token,
    scope:
      "email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts",
  });

  res.redirect(`${facebookAuthURL}?${params.toString()}`);
}
