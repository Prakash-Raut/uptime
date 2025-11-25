import Image from "next/image";

const howItWorks = {
	headline:
		"The only platform you need to maintain reliable services and transparent communication",
};

export default function HowItWorks() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x p-8">
				<h3 className="text-2xl font-semibold tracking-tight text-green-400 uppercase">
					How It Works
				</h3>
				<h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-center md:text-5xl">
					{howItWorks.headline}
				</h2>
				<div className="flex w-full items-center justify-center">
					<Image
						src="/how-it-works.png"
						alt="How it works"
						width={1000}
						height={1000}
						className="rounded-xl object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
