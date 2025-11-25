import Image from "next/image";

const feature = {
	headline: "Stay ahead of downtime",
	features: [
		{
			id: 1,
			category: "Real-time Monitoring",
			title:
				"Get complete visibility and control over your infrastructure health",
			imageUrl: "/feature-one.png",
		},
		{
			id: 2,
			category: "Status Pages",
			title: "Create beautiful status pages to keep your users informed",
			imageUrl: "/feature-two.png",
		},
		{
			id: 3,
			category: "Instant Alerts",
			title: "Get notified instantly when something goes down",
			imageUrl: "/feature-three.png",
		},
	],
};

export default function Features() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<h3 className="text-2xl font-semibold tracking-tight text-green-400 uppercase">
					Some Features You'll Love
				</h3>
				<h2 className="text-3xl font-bold tracking-tight text-center md:text-5xl">
					{feature.headline}
				</h2>
				<div className="flex w-full items-center justify-center">
					<div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
						{feature.features.map((f) => (
							<div
								key={f.id}
								className="flex flex-col items-center gap-x-12 gap-y-6 md:flex-row md:odd:flex-row-reverse"
							>
								<div className="aspect-4/3 w-full rounded-xl">
									<Image
										src={f.imageUrl}
										alt={f.title}
										width={1000}
										height={1000}
										className="rounded-xl object-cover"
									/>
								</div>

								<div className="shrink-0 basis-1/2">
									<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-green-400 uppercase">
										{f.category}
									</h3>
									<h2 className="my-3 scroll-m-20 text-5xl font-bold tracking-tight">
										{f.title}
									</h2>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
