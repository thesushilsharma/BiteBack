import { Layout } from "@/components/Layout"
import { signIn, useSession } from "@/lib/auth-client"
import { createFileRoute, Link, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth-pages)/auth/sign-in")({
  //  beforeLoad: async () => {
  //   const { data: session } = useSession()

  //   if (session) {
  //     throw redirect({ to: "/dashboard" })
  //   }
  // },
  component: RouteComponent
})

function RouteComponent() {

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    await signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
  }


  return (
    <Layout className="items-center gap-2 max-w-md">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form onSubmit={handleSignIn} className="w-full space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
      <small>
        <Link to="/auth/sign-up" className="group">
          Do you want to create an account instead?{" "}
          <span className="underline group-hover:no-underline">Sign Up</span>
        </Link>
      </small>
    </Layout>
  )
}