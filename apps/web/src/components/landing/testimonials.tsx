import { Avatar, AvatarImage } from "../ui/avatar";

const testimonial = {
	headline: "Trusted by teams worldwide",
	description: "What Our Customers Are Saying",
	items: [
		{
			id: 1,
			name: "John Doe",
			designation: "Software Engineer",
			company: "TechCorp",
			testimonial:
				"Better Uptime has been a game-changer. We monitor 200+ microservices and the alerting is so reliable that we've eliminated false positives entirely. The status page keeps our customers informed without our team having to manually update anything.",
			avatar: "https://randomuser.me/api/portraits/men/15.jpg",
		},
		{
			id: 2,
			name: "Sophia Lee",
			designation: "CEO",
			company: "InsightTech",
			testimonial:
				"We switched from Better Stack to Better Uptime and haven't looked back. The incident management features are incredibly intuitive, and having monitoring + status pages + on-call in one platform saves us $500/month.",
			avatar: "https://randomuser.me/api/portraits/women/6.jpg",
		},
		{
			id: 3,
			name: "Michael Johnson",
			designation: "CTO",
			company: "DesignPro",
			testimonial:
				"With 50+ engineers on call, managing rotations was a nightmare. Better Uptime's scheduling and escalation policies just work — we've reduced our mean time to acknowledgment by 60%.",
			avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		},
	],
};

export default function Testimonials() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-green-400 uppercase">
					{testimonial.headline}
				</h3>
				<h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-center md:text-5xl">
					{testimonial.description}
				</h2>
				<div className="mx-auto max-w-(--breakpoint-xl) columns-1 gap-8 md:columns-2 lg:columns-3">
					{testimonial.items.map((t) => (
						<div
							key={t.id}
							className="mb-8 break-inside-avoid rounded-xl p-6 bg-accent"
						>
							<p className="h-60 text-md">{t.testimonial}</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<Avatar>
										<AvatarImage src={t.avatar} />
									</Avatar>
									<div>
										<p className="font-semibold text-lg">{t.name}</p>
										<p className="text-gray-500 text-sm">
											{t.designation} @ {t.company}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
