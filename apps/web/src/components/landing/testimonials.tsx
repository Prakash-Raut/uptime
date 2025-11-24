import { Avatar, AvatarImage } from "../ui/avatar";

const testimonial = {
	headline: "Trusted by teams worldwide",
	description:
		"Monitor your sites and get alerted instantly when issues happen.",
	items: [
		{
			id: 1,
			name: "John Doe",
			designation: "Software Engineer",
			company: "TechCorp",
			testimonial:
				"This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
			avatar: "https://randomuser.me/api/portraits/men/15.jpg",
		},
		{
			id: 2,
			name: "Sophia Lee",
			designation: "CEO",
			company: "InsightTech",
			testimonial:
				"This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
			avatar: "https://randomuser.me/api/portraits/women/6.jpg",
		},
		{
			id: 3,
			name: "Michael Johnson",
			designation: "CTO",
			company: "DesignPro",
			testimonial:
				"An amazing tool that simplifies complex tasks. Highly recommended and the automation features save us countless hours every week. ",
			avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		},
	],
};

export default function Testimonials() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<p className="font-medium text-green-400 text-lg uppercase">
					{testimonial.headline}
				</p>
				<h2 className="text-center font-semibold text-5xl">
					{testimonial.description}
				</h2>
				<div className="mx-auto max-w-(--breakpoint-xl) columns-1 gap-8 md:columns-2 lg:columns-3">
					{testimonial.items.map((t) => (
						<div
							key={t.id}
							className="mb-8 break-inside-avoid rounded-xl p-6 bg-accent"
						>
							<p className="h-32 text-md">{t.testimonial}</p>
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
