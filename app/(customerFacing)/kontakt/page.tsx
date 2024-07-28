import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Label } from "@/components/ui/label";
import {
  LocateFixedIcon,
  MapPinIcon,
  MessageSquareIcon,
  PhoneIcon,
} from "lucide-react";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-12">
      <h1 className="font-bold font-boska text-5xl mb-8">Treba vam pomoć?</h1>
      <div className="flex items-center mt-4 gap-4">
        <PhoneIcon className="w-4 h-4" />
        <Label>+387 63 670 155</Label>
      </div>
      <div className="flex items-center mt-4 gap-4">
        <MessageSquareIcon className="w-4 h-4" />
        <Label>Lepic.elvedin@hotmail.com</Label>
      </div>
      <div className="flex items-center mt-4 gap-4">
        <MapPinIcon className="w-4 h-4" />
        <Label>74254 Novi Seher, Bosna i Hercegovina</Label>
      </div>

      <p className="font-normal text-sm mt-4">
        Ukoliko vam treba bilo kakva pomoć, kontaktirajte nas putem jednog od
        gore navedenih načina.
      </p>
    </MaxWidthWrapper>
  );
};

export default page;
