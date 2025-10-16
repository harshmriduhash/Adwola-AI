import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
	id: string;
	email?: string;
	created_at?: string;
	user_metadata?: {
		full_name?: string;
		avatar_url?: string;
		[key: string]: any;
	};
}

interface UseUserProfileReturn {
	user: UserProfile | null;
	loading: boolean;
	error: string | null;
	signOut: () => Promise<void>;
	updateProfile: (
		updates: Partial<UserProfile["user_metadata"]>,
	) => Promise<void>;
	refreshUser: () => Promise<void>;
}

export function useUserProfile(): UseUserProfileReturn {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const supabase = createClient();

	const refreshUser = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				throw error;
			}

			setUser(user as UserProfile);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to fetch user";
			setError(errorMessage);
			console.error("Error fetching user:", err);
		} finally {
			setLoading(false);
		}
	}, [supabase]);

	const signOut = useCallback(async () => {
		try {
			setError(null);
			const { error } = await supabase.auth.signOut();

			if (error) {
				throw error;
			}

			setUser(null);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to sign out";
			setError(errorMessage);
			throw err;
		}
	}, [supabase]);

	const updateProfile = useCallback(
		async (updates: Partial<UserProfile["user_metadata"]>) => {
			try {
				setError(null);

				if (!user) {
					throw new Error("No user logged in");
				}

				const { data, error } = await supabase.auth.updateUser({
					data: {
						...user.user_metadata,
						...updates,
					},
				});

				if (error) {
					throw error;
				}

				if (data.user) {
					setUser(data.user as UserProfile);
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to update profile";
				setError(errorMessage);
				throw err;
			}
		},
		[user, supabase],
	);

	// Initial load and auth state changes
	useEffect(() => {
		refreshUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_IN" && session?.user) {
				setUser(session.user as UserProfile);
				setLoading(false);
			} else if (event === "SIGNED_OUT") {
				setUser(null);
				setLoading(false);
			} else if (event === "TOKEN_REFRESHED" && session?.user) {
				setUser(session.user as UserProfile);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, refreshUser]);

	return {
		user,
		loading,
		error,
		signOut,
		updateProfile,
		refreshUser,
	};
}
