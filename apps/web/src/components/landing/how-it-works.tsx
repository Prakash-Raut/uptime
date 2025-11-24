import Image from "next/image";

const howItWorks = {
	headline: "Monitor uptime. Get alerts. Stay online.",
};

export default function HowItWorks() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x p-8">
				<h2 className="max-w-4xl text-center font-semibold text-4xl">
					{howItWorks.headline}
				</h2>
				<div className="flex w-full items-center justify-center">
					<Image
						src="/demo.png"
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
