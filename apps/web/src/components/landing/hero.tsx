import { ChevronRightIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<Badge
					variant="outline"
					className="px-4 py-1.5 font-medium text-gray-600 bg-accent"
				>
					Backed by 100xDevs
				</Badge>
				<h1 className="max-w-4xl text-center font-semibold text-7xl tracking-tight text-balance">
					Monitor your uptime <br />
					Track every incident
				</h1>
				<p className="max-w-lg text-center">
					Real-time monitoring for your websites and APIs. Get instant alerts
					when something goes down.
				</p>
				<div className="flex items-center justify-center">
					<Button className="transition-all duration-300">
						<span>Start Monitoring Now</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex h-[576px] w-full items-center justify-center">
					<iframe
						title="Uptime Demo"
						src="https://app.supademo.com/demo/cmc0xjr1hj5y3sn1rbn1h092b"
						width="100%"
						height="100%"
						allowFullScreen={true}
						style={{ border: "none" }}
					/>
				</div>
			</div>
		</section>
	);
}
