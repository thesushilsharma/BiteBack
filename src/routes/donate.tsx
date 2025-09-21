import { useSession } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router'
import { DonateForm  } from '@/components/submission-form/donate-form'

export const Route = createFileRoute('/donate')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = useSession();
    return <div>
      {session && <p>Client Signed in as {session.user.name}</p>}

      <h1>Donation Tracking (Base)</h1>
      <DonateForm />
    </div>
}
