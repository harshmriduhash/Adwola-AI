"use client";

import { Facebook, Instagram, Linkedin, Trash2, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface Connection {
	id: string;
	platform: string;
	platform_user_name: string;
	created_at: string;
}

interface SocialConnectionsManagerProps {
	initialConnections: Connection[];
}

const platformIcons = {
	linkedin: <Linkedin className="w-6 h-6 text-[#0A66C2]" />,
	twitter: <Twitter className="w-6 h-6 text-[#1DA1F2]" />,
	instagram: <Instagram className="w-6 h-6 text-[#E4405F]" />,
	facebook: <Facebook className="w-6 h-6 text-[#1877F2]" />,
};

export function SocialConnectionsManager({
	initialConnections,
}: SocialConnectionsManagerProps) {
	const [connections, setConnections] =
		useState<Connection[]>(initialConnections);
	const supabase = createClient();

	const handleConnect = (platform: string) => {
		// This will be implemented with the actual OAuth flow
		window.location.href = `/api/auth/${platform}`;
	};

	const handleDisconnect = async (connectionId: string) => {
		if (!confirm("Are you sure you want to disconnect this account?")) {
			return;
		}

		try {
			const { error } = await supabase
				.from("social_connections")
				.delete()
				.eq("id", connectionId);

			if (error) throw error;

			setConnections((prev) => prev.filter((c) => c.id !== connectionId));
			toast.success("Account disconnected successfully!");
		} catch (error: unknown) {
			toast.error(
				`Failed to disconnect account: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Social Media Connections</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{Object.keys(platformIcons).map((platform) => {
						const connection = connections.find((c) => c.platform === platform);
						return (
							<div
								key={platform}
								className="p-4 border rounded-lg flex items-center justify-between"
							>
								<div className="flex items-center gap-4">
									{platformIcons[platform as keyof typeof platformIcons]}
									<span className="font-medium capitalize">{platform}</span>
								</div>
								{connection ? (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											{connection.platform_user_name}
										</span>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleDisconnect(connection.id)}
										>
											<Trash2 className="w-4 h-4 mr-2" />
											Disconnect
										</Button>
									</div>
								) : (
									<Button onClick={() => handleConnect(platform)}>
										Connect
									</Button>
								)}
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
