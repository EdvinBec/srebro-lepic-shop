// components/ClientLineItems.tsx
"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import axios from "axios";

type ClientLineItemsProps = {
  sessionId: string;
};

interface StripeLineItem {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  quantity: number;
  price: {
    id: string;
    object: string;
    unit_amount: number;
    currency: string;
    product: string;
  };
}

const ClientLineItems: React.FC<ClientLineItemsProps> = ({ sessionId }) => {
  const [lineItems, setLineItems] = useState<StripeLineItem[]>([]);

  const fetchCheckoutSession = async (sessionId: string) => {
    try {
      const response = await axios.post("/api/stripe/session", { sessionId });
      return response.data;
    } catch (error) {
      console.error("Error fetching Stripe session:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await fetchCheckoutSession(sessionId);
        setLineItems(session.line_items.data);
      } catch (error) {
        console.error("Error fetching line items:", error);
      }
    };

    fetchSession();
  }, [sessionId]);

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-xl font-bold">Line Items</h2>
      <ul className="list-disc pl-8">
        {lineItems.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.description} -{" "}
            {formatCurrency(item.amount_total)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientLineItems;
