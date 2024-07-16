import { OrderItem, Product } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type ButtonOption = {
  rightIcon?: string;
  leftIcon: LucideIcon;
  label: string;
  value: string;
};

export type User = {
  id: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
};

export type OrderList = {
  id: number;
  isSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  price: number;
  paymentMethod: string;
  products: OrderItem[];
  user: User;
};

export type DeliveryFormData = {
  name: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    country: string;
    postal_code: string;
  };
};
