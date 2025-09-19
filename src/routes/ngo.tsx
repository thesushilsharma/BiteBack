import { useSession } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ngo')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = useSession();
    return <div>
      {session && <p>Client Signed in as {session.user.name}</p>}
    </div>
}
