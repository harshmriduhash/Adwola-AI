import { redirect } from "next/navigation";

export default async function SettingsPage({
	searchParams,
}: {
	searchParams: Promise<{
		tab?: string;
		connection?: string;
		status?: string;
		message?: string;
		success?: string;
		canceled?: string;
	}>;
}) {
	const params = await searchParams;
	const queryString = new URLSearchParams(
		params as Record<string, string>,
	).toString();
	const redirectUrl = `/settings${queryString ? `?${queryString}` : ""}`;

	return redirect(redirectUrl);
}
