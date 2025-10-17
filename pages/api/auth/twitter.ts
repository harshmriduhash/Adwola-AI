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

  // Note: Twitter's OAuth 2.0 flow is more complex and requires PKCE.
  // This is a simplified placeholder.
  const twitterAuthURL = "https://twitter.com/i/oauth2/authorize";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.TWITTER_CLIENT_ID ?? "",
    redirect_uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/twitter-callback`,
    state: session.access_token,
    scope: "tweet.read tweet.write users.read offline.access",
    code_challenge: "challenge", // Replace with a real PKCE code challenge
    code_challenge_method: "S256",
  });

  res.redirect(`${twitterAuthURL}?${params.toString()}`);
}
