// INTENTIONAL BUILD BREAK — remove this line to fix
const _buildBreaker: string = 42; // TS2322: Type 'number' is not assignable to type 'string'
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import IntegrationHub from "@/components/IntegrationHub";
import StatsStrip from "@/components/Marquee";
import ValueProps from "@/components/ValueProps";
import ManualHook from "@/components/ManualHook";
import HowItWorks from "@/components/HowItWorks";
import Reasoning from "@/components/Reasoning";
import Platform from "@/components/Platform";
import Comparison from "@/components/Comparison";
import Integrations from "@/components/Integrations";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <IntegrationHub />
      <StatsStrip />
      <ValueProps />
      <ManualHook />
      <HowItWorks />
      <Reasoning />
      <Platform />
      <Comparison />
      <Integrations />
      <CTA />
      <Footer />
    </main>
  );
}
