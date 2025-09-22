import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ngo")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session } = useSession();
	return (
		<div>
			{session && (
				<div>
					<p>Client Signed in as {session.user.name}</p>
					<Button onClick={() => signOut()}>
						Sign Out
					</Button>
				</div>
			)}
		</div>
	);
}
