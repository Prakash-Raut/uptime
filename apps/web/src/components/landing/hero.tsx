import { PlayIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="relativew-full border-b">
			<div className="container mx-auto min-h-screen flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<Badge
					variant="outline"
					className="px-4 py-1.5 font-medium text-gray-600 bg-accent"
				>
					Backed by 100xDevs
				</Badge>
				<h1 className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold text-center max-w-4xl tracking-tight text-balance antialiased leading-tight">
					Monitor your uptime <br />
					Track every incident
				</h1>
				<p className="max-w-lg text-center text-base md:text-lg text-muted-foreground leading-relaxed">
					Monitor your infrastructure, create beautiful status pages, and manage
					incidents seamlessly.
				</p>
				<div className="flex items-center justify-center gap-2">
					<Button className="transition-all duration-300">
						<span>Start Monitoring Free</span>
					</Button>
					<Button variant="outline" className="transition-all duration-300">
						<span>Watch Demo</span>
						<PlayIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
