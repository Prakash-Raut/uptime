import { redirect } from "next/navigation";
import { authClient } from "./auth-client";

export const requireAuth = async () => {
	const session = await authClient.getSession();

	if (!session || !session.data?.session || !session.data?.user) {
		redirect("/login");
	}

	return {
		session: session.data?.session,
		user: session.data?.user,
	};
};

export const getSession = async () => {
	const { session } = await requireAuth();
	return session;
};

export const getUser = async () => {
	const { user } = await requireAuth();
	return user;
};
