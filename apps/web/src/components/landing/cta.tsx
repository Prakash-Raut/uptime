import { Button } from "../ui/button";

const cta = {
	headline: "Start with a free trial today!",
};

export default function CTA() {
	return (
		<section
			className="w-full bg-green-100"
			style={{
				backgroundImage: "url('/cta.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 px-8 py-5">
				<div className="flex h-[562px] w-full flex-col items-center justify-center space-y-4">
					<h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-center md:text-5xl">
						{cta.headline}
					</h2>
					<div className="flex items-center justify-center gap-2">
						<Button className="transition-all duration-300">
							<span>Sign up for free</span>
						</Button>
						<Button variant="outline" className="transition-all duration-300">
							<span>Book a demo</span>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
