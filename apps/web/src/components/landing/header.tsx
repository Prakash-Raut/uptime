"use client";

import Image from "next/image";
import { Button } from "../ui/button";

export default function Header() {
	return (
		<div className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-row items-center justify-between border-x px-8 py-5">
				<nav className="flex items-center gap-1 font-medium text-2xl">
					<Image src="/uptime-logo.svg" alt="Uptime" width={40} height={40} />
					Uptime
				</nav>
				<div className="flex items-center gap-2">
					<Button variant="outline">Talk to us</Button>
					{/* <UserMenu /> */}
				</div>
			</div>
		</div>
	);
}
