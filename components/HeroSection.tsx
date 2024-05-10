import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Button from "./Button/Button";

const HeroSection = () => {
  return (
    <section className="bg-center bg-no-repeat bg-hero-image py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="w-4/5 lg:w-2/3">
          <h1 className="text-8xl mb-2.5 font-bold text-white font-boska">
            SVE NA JEDNOM MJESTU
          </h1>
          <p className="text-white text-lg leading-6 font-light md:w-2/3">
            Zaustavite potragu - ovdje ste pronašli sve što tražite. Želite li
            nešto više od običnog nakita? Mi smo upravo ono što tražite.
          </p>
          <Button>Pogledajte našu ponudu</Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default HeroSection;
