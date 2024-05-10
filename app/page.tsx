import Heading from "@/components/Heading";
import HeroSection from "@/components/HeroSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <HeroSection />
      <MaxWidthWrapper>
        <section>
          <Heading className="mt-10 md:mt-16">Naše preporuke</Heading>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
