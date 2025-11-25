import { requireAuth } from "@/lib/auth-util";

export default async function Dashboard() {
	await requireAuth();
	return <div>Home</div>;
}
