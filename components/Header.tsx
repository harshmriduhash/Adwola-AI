import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { SupabaseLogo } from "./supabase-logo"; // Using this as a placeholder logo

export default function Header({ user }: { user: User | null }) {
	return (
		<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
			<div className="flex items-center gap-4">
				<Link href="/" className="flex items-center gap-2 font-bold">
					<SupabaseLogo />
					AmplifyAI
				</Link>
				{user && (
					<div className="hidden sm:flex items-center gap-4">
						<Link
							href="/brands"
							className="text-foreground/80 hover:text-foreground"
						>
							Brands
						</Link>
						<Link
							href="/campaigns"
							className="text-foreground/80 hover:text-foreground"
						>
							Campaigns
						</Link>
						<Link
							href="/results"
							className="text-foreground/80 hover:text-foreground"
						>
							Results
						</Link>
					</div>
				)}
			</div>
			<AuthButton />
		</div>
	);
}
