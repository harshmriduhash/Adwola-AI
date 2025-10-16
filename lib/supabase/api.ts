import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

export function createClient(req: NextApiRequest, res: NextApiResponse) {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return Object.keys(req.cookies).map((name) => ({
						name,
						value: req.cookies[name] || "",
					}));
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						res.setHeader(
							"Set-Cookie",
							`${name}=${value}; Path=/; ${options?.httpOnly ? "HttpOnly;" : ""} ${
								options?.secure ? "Secure;" : ""
							} ${options?.sameSite ? `SameSite=${options.sameSite};` : ""} ${
								options?.maxAge ? `Max-Age=${options.maxAge};` : ""
							}`,
						);
					});
				},
			},
		},
	);
}
