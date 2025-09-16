import { createMiddleware } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { auth } from "./auth";

export const authMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const session = await auth.api.getSession({
			headers: getHeaders() as unknown as Headers,
		});

		return await next({
			context: {
				user: {
					id: session?.user?.id,
					email: session?.user?.email,
					name: session?.user?.name,
					image: session?.user?.image,
				},
			},
		});
	},
);