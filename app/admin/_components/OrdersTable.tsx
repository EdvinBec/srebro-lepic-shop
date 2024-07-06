"use client";

import { formatCurrency } from "@/lib/formatters";
import { OrderList } from "@/types";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

type Props = {
  orders: OrderList[];
};

const OrdersTable = ({ orders }: Props) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 mb-2">Neobradjene narudžbe</h1>
      <table className="w-full">
        <tr className="text-sm">
          <th className="py-2">Broj narudžbe</th>
          <th>Datum nastanka</th>
          <th>Kupac</th>
          <th>Iznos</th>
          <th>Način plaćanja</th>
          <th>Stanje</th>
        </tr>
        {orders.map((order) => (
          <tr
            key={order.id}
            onClick={() => router.push(`/admin/order/${order.id}`)}
            className="hover:bg-black hover:bg-opacity-5 transition-all ease-in-out duration-150 border-b-[1px] cursor-pointer"
          >
            <td className="text-center">{order.id}</td>
            <td className="text-center">
              {order.createdAt.toLocaleDateString()}
            </td>
            <td className="text-center py-3">{order.user.fullName}</td>
            <td className="text-center">{formatCurrency(order.price / 100)}</td>
            <td className="text-center">{order.paymentMethod}</td>
            <td className="text-center">
              {order.isSent ? (
                <span className="text-green-500">Poslano</span>
              ) : (
                <span className="text-red-500">Nije poslano</span>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default OrdersTable;
