import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { deliveryFee } from "@/config";
import { formatCurrency } from "@/lib/formatters";
import React from "react";

type Props = {};

const PAGE = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-16">
      <h1 className="font-bold text-5xl font-boska mb-4">FAQ</h1>
      <div id="placanje" className="w-3/4 mb-4">
        <h2 className="font-bold text-lg">Dostupni načini plaćanja</h2>
        <p>
          Pri kupovini kod nas, nudimo vam različite načine plaćanja kako biste
          mogli odabrati onaj koji vam najviše odgovara. Možete platiti putem
          kartice ili po pouzeću, kada preuzmete sami paket.
        </p>
      </div>
      <div id="politika-povrata" className="w-3/4 mb-4">
        <h2 className="font-bold text-lg">Politika povrata</h2>
        <p>
          Vaše zadovoljstvo nam je prioritet. Ako iz bilo kojeg razloga niste
          zadovoljni kupovinom, nudimo vam mogućnost povrata proizvoda u roku od
          30 dana od dana kupovine. Proizvod mora biti neoštećen i u originalnom
          pakiranju.
        </p>
      </div>
      <div id="informacije-o-dostavi" className="w-3/4 mb-4">
        <h2 className="font-bold text-lg">Informacije o dostavi</h2>
        <p>
          Nudimo brzu i pouzdanu dostavu širom Bosne i Hercegovine. Troškovi
          dostave standardnih paketa su fiknsih {formatCurrency(deliveryFee)}.
          Uobičajeno vrijeme isporuke je 2-5 radnih dana od potvrde narudžbe.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default PAGE;
