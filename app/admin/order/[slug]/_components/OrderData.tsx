"use client";

import { toggleIsSent } from "@/app/admin/_actions/orders";
import Button from "@/components/Button/Button";
import Heading from "@/components/Heading";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import { Printer } from "lucide-react";
import Image from "next/image";
import React from "react";

type combinedType = Product & { size: number; quantity: number };

type Props = {
  order: {
    id: number;
    createdAt: Date;
    price: number;
    isSent: boolean;
  };
  user: {
    fullName: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    zip: string;
  };
  products: combinedType[];
};

const OrderData = ({ order, user, products }: Props) => {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-between">
        <div>
          <Heading side="left" star={false} className="text-xl text-left">
            Narudžba
          </Heading>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-nowrap">Broj narudžbe: </Label>
              <span className="font-bold">{order?.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-nowrap">Datum: </Label>
              <span className="font-bold">
                {new Date(order?.createdAt!).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button
            className="print:hidden"
            variant="secondary"
            onClick={() => window.print()}
          >
            <Printer size={24} />
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold mb-1">Podatci za dostavu</h2>
        <div className="border-[1px] px-4 py-2 rounded-sm inline-block">
          <div>
            <Label>Ime i prezime: </Label>
            <span>{user?.fullName}</span>
          </div>
          <div>
            <Label>Telefon: </Label>
            <span>{user?.phone}</span>
          </div>
          <div>
            <Label>Adresa: </Label>
            <span>{user?.address}</span>
          </div>
          <div>
            <Label>Država: </Label>
            <span>{user?.country}</span>
          </div>
          <div>
            <Label>Grad: </Label>
            <span>{user?.city}</span>
          </div>
          <div>
            <Label>Poštanski broj: </Label>
            <span>{user?.zip}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <table className="w-full">
          <thead className="mb-2">
            <tr className="text-center">
              <th>Slika</th>
              <th>Proizvod</th>
              <th>Količina</th>
              <th>Veličina</th>
              <th>Cijena</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="text-center hover:bg-black hover:bg-opacity-5 transition-all ease-in-out duration-200 rounded-sm"
              >
                <td className="flex justify-center py-2">
                  <Image
                    src={product.image!}
                    alt={product.name!}
                    width={80}
                    height={80}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.size}</td>
                <td>{formatCurrency(product.priceInCents!)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="text-right">
                Proizvodi:
              </td>
              <td className="text-center">
                {formatCurrency(order?.price! / 100)}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-right">
                Dostava:
              </td>
              <td className="text-center">{formatCurrency(5)}</td>
            </tr>
            <tr className="font-bold border-t-[1px]">
              <td colSpan={4} className="text-right">
                Ukupno:
              </td>
              <td className="text-center">
                {formatCurrency(order?.price! / 100 + 5)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button
        onClick={async () => {
          await toggleIsSent(order.id, true);
        }}
        variant="secondary"
        className="mt-12 print:hidden"
        disabled={order.isSent}
      >
        {!order.isSent ? "Označi kao isporučeno" : "Isporučeno"}
      </Button>
    </div>
  );
};

export default OrderData;
