import { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  image: any;
  title: string;
  price: number;
  category?: string;
  material?: "Zlato" | "srebro" | "gvožđe";
};

export type ButtonOption = {
  rightIcon?: string;
  leftIcon: LucideIcon;
  label: string;
  function?: (name: string) => void;
};
