import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { getUserID } from "@/lib/auth-server-fn";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: async () => {
		const userID = await getUserID();
		return { userID };
	},
	loader: async ({ context }) => {
		if (!context.userID) {
			throw redirect({ to: "/" });
		}
		return { userID: context.userID };
	},
});

function RouteComponent() {
	const { userID } = Route.useLoaderData();
	const navigate = useNavigate();

	return (
		<div>
			<p> User ID : {userID}</p>
			{userID && (
				<Button
					onClick={() =>
						signOut({}, { onSuccess: () => navigate({ to: "/auth/sign-in" }) })
					}
				>
					Sign Out
				</Button>
			)}
		</div>
	);
}
