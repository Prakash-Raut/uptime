import CTA from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Floating from "@/components/landing/floating";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import MoreFeatures from "@/components/landing/more-features";
import Pricing from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonials";

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<Floating />
			<HowItWorks />
			<Features />
			<MoreFeatures />
			<Testimonials />
			<Pricing />
			<CTA />
			<Footer />
		</>
	);
}
