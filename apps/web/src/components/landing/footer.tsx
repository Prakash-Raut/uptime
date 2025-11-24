import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const logo = {
	src: "/uptime-logo.svg",
	alt: "Uptime",
	title: "Uptime",
	url: "/",
};

const menuItems = [
	{
		id: 1,
		title: "Product",
		links: [
			{ id: 1, text: "Overview", url: "#" },
			{ id: 2, text: "Pricing", url: "#" },
			{ id: 3, text: "Features", url: "#" },
			{ id: 4, text: "Integrations", url: "#" },
		],
	},
	{
		id: 2,
		title: "Company",
		links: [
			{ id: 1, text: "About", url: "#" },
			{ id: 2, text: "Blog", url: "#" },
			{ id: 3, text: "Careers", url: "#" },
			{ id: 4, text: "Contact", url: "#" },
		],
	},
	{
		id: 3,
		title: "Legal",
		links: [
			{ id: 1, text: "Privacy Policy", url: "#" },
			{ id: 2, text: "Terms of Service", url: "#" },
		],
	},
];
const copyright = "© 2025 Uptime. All rights reserved.";

export default function Footer() {
	return (
		<section className="py-6">
			<div className="container mx-auto max-w-6xl px-8 py-5">
				<footer>
					<div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
						<div className="col-span-3 mb-8 lg:mb-0">
							<div className="flex items-center gap-2 lg:justify-start">
								<Logo>
									<LogoImage
										src={logo.src}
										alt={logo.alt}
										title={logo.title}
										className="h-10 dark:invert"
									/>
									<LogoText className="text-xl">{logo.title}</LogoText>
								</Logo>
							</div>
						</div>
						{menuItems.map((section) => (
							<div key={section.id}>
								<h3 className="mb-4 font-bold">{section.title}</h3>
								<ul className="space-y-4 text-muted-foreground">
									{section.links.map((link) => (
										<li
											key={link.id}
											className="font-medium hover:text-primary"
										>
											<a href={link.url}>{link.text}</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 font-medium text-muted-foreground text-sm md:flex-row md:items-center">
						<p>{copyright}</p>
						<ul className="flex gap-4">
							<li className="hover:text-primary">
								<Link href="https://github.com/PrakashRaut">
									<span>Made with ❤️ in India</span>
								</Link>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		</section>
	);
}

function Logo({ children }: { children: React.ReactNode }) {
	return (
		<Link href="/" className="flex items-center gap-2">
			{children}
		</Link>
	);
}

function LogoImage({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	title: string;
	className: string;
}) {
	return (
		<Image src={src} alt={alt} width={40} height={40} className={className} />
	);
}

function LogoText({
	children,
	className,
}: {
	children: React.ReactNode;
	className: string;
}) {
	return <p className={cn("", className)}>{children}</p>;
}
