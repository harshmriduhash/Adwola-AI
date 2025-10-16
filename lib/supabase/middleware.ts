import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { hasEnvVars } from "../utils";

// Simple in-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(
	request: NextRequest,
	userId: string,
): Promise<{ allowed: boolean; retryAfter: number }> {
	const key = `${userId}:${request.nextUrl.pathname}`;
	const now = Date.now();
	const windowSize = 60 * 1000; // 1 minute
	const maxRequests = 100; // Max requests per window

	const record = rateLimitStore.get(key);

	if (!record || now > record.resetTime) {
		// New window or expired record
		rateLimitStore.set(key, { count: 1, resetTime: now + windowSize });
		return { allowed: true, retryAfter: 0 };
	}

	if (record.count >= maxRequests) {
		// Rate limit exceeded
		const retryAfter = Math.ceil((record.resetTime - now) / 1000);
		return { allowed: false, retryAfter };
	}

	// Increment count
	record.count++;
	return { allowed: true, retryAfter: 0 };
}

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	// If the env vars are not set, skip middleware check
	if (!hasEnvVars) {
		return supabaseResponse;
	}

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const url = request.nextUrl.clone();
	const pathname = url.pathname;

	// Define route protection rules
	const authRequiredRoutes = ["/dashboard", "/brands", "/campaigns"];
	const adminRoutes = ["/admin"];

	// Check if the current path requires authentication
	const isAuthRequiredRoute = authRequiredRoutes.some((route) =>
		pathname.startsWith(route),
	);

	// Check if the current path is admin-only
	const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

	// Handle unauthenticated users
	if (!user) {
		if (isAuthRequiredRoute || isAdminRoute) {
			// Redirect to login with return URL
			const redirectUrl = new URL("/auth/login", request.url);
			redirectUrl.searchParams.set("redirectTo", pathname);
			return NextResponse.redirect(redirectUrl);
		}
		// Allow access to public routes
	} else {
		// Handle authenticated users
		// Redirect authenticated users away from auth pages
		if (
			pathname.startsWith("/auth/login") ||
			pathname.startsWith("/auth/signup")
		) {
			const redirectTo = url.searchParams.get("redirectTo") || "/dashboard";
			return NextResponse.redirect(new URL(redirectTo, request.url));
		}

		// Check admin access
		if (isAdminRoute) {
			const userMetadata = user.user_metadata || {};
			const isAdmin =
				userMetadata.role === "admin" || userMetadata.is_admin === true;

			if (!isAdmin) {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		}

		// Ensure user profile exists for authenticated routes
		if (isAuthRequiredRoute) {
			try {
				const { data: profile } = await supabase
					.from("users")
					.select("id")
					.eq("id", user.id)
					.single();

				// If no profile exists, create one
				if (!profile) {
					await supabase.from("users").insert({
						id: user.id,
						full_name:
							user.user_metadata?.full_name || user.email?.split("@")[0],
						avatar_url: user.user_metadata?.avatar_url,
					});
				}
			} catch (error) {
				console.error("Error checking/creating user profile:", error);
			}
		}
	}

	// Rate limiting for API endpoints
	if (pathname.startsWith("/api/") || pathname.includes("/functions/")) {
		const rateLimitResult = await checkRateLimit(
			request,
			user?.id || "anonymous",
		);
		if (!rateLimitResult.allowed) {
			return new NextResponse(
				JSON.stringify({
					error: "Rate limit exceeded",
					retryAfter: rateLimitResult.retryAfter,
				}),
				{
					status: 429,
					headers: {
						"Content-Type": "application/json",
						"Retry-After": rateLimitResult.retryAfter.toString(),
					},
				},
			);
		}
	}

	// Enhanced security headers
	supabaseResponse.headers.set("X-Frame-Options", "DENY");
	supabaseResponse.headers.set("X-Content-Type-Options", "nosniff");
	supabaseResponse.headers.set(
		"Referrer-Policy",
		"strict-origin-when-cross-origin",
	);
	supabaseResponse.headers.set(
		"Permissions-Policy",
		"camera=(), microphone=(), geolocation=()",
	);
	supabaseResponse.headers.set("X-XSS-Protection", "1; mode=block");

	// Content Security Policy
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"font-src 'self' https://fonts.gstatic.com",
		"img-src 'self' data: https: blob:",
		"connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.openai.com https://api.anthropic.com",
		"frame-src 'none'",
		"object-src 'none'",
		"base-uri 'self'",
	].join("; ");

	supabaseResponse.headers.set("Content-Security-Policy", csp);

	// Log security events for monitoring
	if (user && isAuthRequiredRoute) {
		console.log(
			`[Security] User ${user.id} accessed ${pathname} at ${new Date().toISOString()}`,
		);
	}

	return supabaseResponse;
}
