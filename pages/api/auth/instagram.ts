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

  const instagramAuthURL = "https://api.instagram.com/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID ?? "",
    redirect_uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/instagram-callback`,
    scope: "user_profile,user_media",
    response_type: "code",
    state: session.access_token,
  });

  res.redirect(`${instagramAuthURL}?${params.toString()}`);
}
