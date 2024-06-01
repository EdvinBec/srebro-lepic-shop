import { IconNode, LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  imageURL: any;
  title: string;
  price: string;
  url: "/";
};

export type ButtonOption = {
  rightIcon?: string;
  leftIcon: LucideIcon;
  label: string;
  function?: (name: string) => void;
};
