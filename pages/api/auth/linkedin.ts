import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/lib/supabase/api";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const supabase = createClient(req, res);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return res.status(401).json({ error: "Not authenticated" });
	}

	const linkedInAuthURL = "https://www.linkedin.com/oauth/v2/authorization";
	const params = new URLSearchParams({
		response_type: "code",
		client_id: process.env.LINKEDIN_CLIENT_ID ?? "",
		redirect_uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/linkedin-callback`,
		state: session.access_token, // Pass the user's access token as the state
		scope: "r_liteprofile r_emailaddress w_member_social", // Scopes for reading profile and posting
	});

	res.redirect(`${linkedInAuthURL}?${params.toString()}`);
}
