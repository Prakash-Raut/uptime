import Image from "next/image";

const feature = {
	headline: "Stay ahead of downtime",
	description:
		"Monitor your sites and get alerted instantly when issues happen.",
	features: [
		{
			id: 1,
			category: "Uptime Monitoring",
			title: "Track websites and servers around the clock",
		},
		{
			id: 2,
			category: "Instant Alerts",
			title: "Know the second something goes down",
		},
		{
			id: 3,
			category: "Incident Reports",
			title: "See what happened and when",
		},
	],
};

export default function Features() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<h2 className="text-center font-semibold text-5xl">
					{feature.headline}
				</h2>
				<p className="max-w-lg text-center">{feature.description}</p>
				<div className="flex w-full items-center justify-center">
					<div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
						{feature.features.map((f) => (
							<div
								key={f.id}
								className="flex flex-col items-center gap-x-12 gap-y-6 md:flex-row md:even:flex-row-reverse"
							>
								<div className="aspect-4/3 w-full rounded-xl">
									<Image
										src="/cta.jpg"
										alt={f.title}
										width={1000}
										height={1000}
										className="rounded-xl object-cover"
									/>
								</div>

								<div className="shrink-0 basis-1/2">
									<span className="font-medium text-green-400 text-lg uppercase">
										{f.category}
									</span>
									<h4 className="my-3 font-medium text-5xl tracking-tight">
										{f.title}
									</h4>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
