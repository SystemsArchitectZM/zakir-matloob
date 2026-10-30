import { AnalogFeature } from "@/components/sections/analog-feature";
import { CaseStudies } from "@/components/sections/case-studies";
import { Collaborators } from "@/components/sections/collaborators";
import { ContactPanel } from "@/components/sections/contact-panel";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { ImpactCarousel } from "@/components/sections/impact-carousel";
import { JournalPreview } from "@/components/sections/journal-preview";
import { SocialProof } from "@/components/sections/social-proof";
import { Testimonials } from "@/components/sections/testimonials";
import { Trusted } from "@/components/sections/trusted";
import { WhyPartner } from "@/components/sections/why-partner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trusted />
      <Impact />
      <SocialProof />
      <CaseStudies />
      <WhyPartner />
      <AnalogFeature />
      <Experience />
      <ImpactCarousel />
      <Collaborators />
      <JournalPreview />
      <Testimonials />
      <ContactPanel />
    </main>
  );
}
