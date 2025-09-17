import { Layout } from "@/components/Layout"
import { signUp, useSession } from "@/lib/auth-client"
import { createFileRoute, Link, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth-pages)/auth/sign-up")({
  //  beforeLoad: async () => {
  //   const { data: session } = useSession()

  //   if (session) {
  //     throw redirect({ to: "/dashboard" })
  //   }
  // },
  component: RouteComponent,
})

function RouteComponent() {
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    await signUp.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    })
  }

  return (
    <Layout className="items-center gap-2 max-w-md">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignUp} className="w-full space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <small>
        <Link to="/auth/sign-in" className="group">
          Do you already have an account?{" "}
          <span className="underline group-hover:no-underline">Sign In</span>
        </Link>
      </small>
    </Layout>
  )
}