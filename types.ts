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
