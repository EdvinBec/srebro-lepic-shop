import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nadia from "@/public/assets/Nadia.jpg";
import Pandora from "@/public/assets/Pandora.svg";
import DanielKlein from "@/public/assets/DanielKlein.svg";
import Clock from "@/public/assets/Sat.jpg";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
});
const ProductsCarousel = dynamic(
  () => import("@/components/ProductsCarousel"),
  { ssr: false }
);
const Article = dynamic(() => import("@/components/Article"), { ssr: false });
const ShowRow = dynamic(() => import("@/components/ShowRow"), { ssr: false });

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <MaxWidthWrapper>
        <section>
          <Heading className="mt-10 md:mt-16">Naše preporuke</Heading>
          <ProductsCarousel featured={true} />
        </section>
        <Article
          heading="PERSONALIZOVANI POKLONI"
          buttonLabel="Istražite našu kolekciju"
          image={Nadia}
          href="/kategorija/nakit-sa-posvetom"
        >
          <div>
            <p className="text-sm mt-4">
              Tražite nešto posebno? Nalazite se na pravom mjestu.
            </p>
            <p className="text-sm mt-4">
              U Srebro Lepić, stvaramo više od nakita. Naša kolekcija narukvica
              i ogrlica s personaliziranim imenima ili posvetama po vašoj želji
              jamči, da ćete pronaći savršen poklon.{" "}
            </p>
            <p className="text-sm mt-4">
              Zamislite iznenađenje na licu vašeg voljenog dok otvara poklon
              koji je posebno stvoren samo za njih.{" "}
            </p>
          </div>
        </Article>
      </MaxWidthWrapper>
      <ShowRow image={Pandora} className="my-8 md:my-12" />
      <MaxWidthWrapper>
        <section>
          <div>
            <Heading side="left" className="mt-10 md:mt-16">
              Prstenje
            </Heading>
            <ProductsCarousel category="prstenje" />
          </div>
          <div>
            <Heading side="left" className="mt-10 md:mt-16">
              Ogrlice
            </Heading>
            <ProductsCarousel category="ogrlice" />
          </div>
        </section>
      </MaxWidthWrapper>
      <ShowRow image={DanielKlein} className="my-8 md:my-12" />
      <MaxWidthWrapper>
        <Article
          heading="BUDI U KORAKU SA VREMENOM"
          buttonLabel="Istražite našu kolekciju"
          image={Clock}
          side="right"
          href="/kategorija/satovi"
        >
          <div>
            <p className="text-sm mt-4">
              Da li tražite idealan sat koji odgovara svakoj prilici?
            </p>
            <p className="text-sm mt-4">
              Naša široka kolekcija modernih i klasičnih satova poznatih
              brendova nudi raznolikost satova koji savršeno spajaju stil i
              praktičnost.{" "}
            </p>
            <p className="text-sm mt-4">
              Pronađite svoj savršeni sat danas! Istražite našu kolekciju satova
              i podignite svoj stil na novi nivo.{" "}
            </p>
          </div>
        </Article>
      </MaxWidthWrapper>
    </div>
  );
}
