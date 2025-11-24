"use client";

import { ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

const cta = {
	headline: "Try Uptime now.",
	buttonText: "Start free trial",
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
					<p className="max-w-3xl text-center font-medium text-5xl tracking-tight">
						{cta.headline}
					</p>
					<Button className="transition-all duration-300">
						<span>{cta.buttonText}</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
