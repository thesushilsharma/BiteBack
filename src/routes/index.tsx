import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	notFoundComponent: () => <div>This page doesn't exist!</div>
});

function App() {
	return (
		<section className="prose max-w-none p-6 md:p-12 lg:p-24 mx-auto text-center min-h-[80vh] flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">🥪 BiteBack</h1>
			<p className="text-gray-600">
				AI-powered and blockchain-enabled platform to detect surplus food and
				transparently track donations.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
				<Feature title="AI Surplus Prediction" href="/dashboard" />
				<Feature title="Donation Tracking (Base)" href="/donate" />
				<Feature title="NGO Pickup Portal" href="/ngo" />
			</div>
		</section>
	);
}

function Feature({ title, href }: { title: string; href: string }) {
	return (
		<Link to={href} className="card p-6 block hover:shadow-md transition-shadow">
			<h3 className="font-semibold text-lg mb-1">{title}</h3>
			<p className="text-sm text-gray-600">Open</p>
		</Link>
	);
}
