"use client";

import React, { ComponentProps } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AdminNavigation = ({ children, className }: Props) => {
  return (
    <nav
      className={cn("flex justify-center gap-4 px-4 text-darkGray", className)}
    >
      {children}
    </nav>
  );
};

export default AdminNavigation;

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "px-4 py-2",
        pathname === props.href && "bg-darkGray text-white"
      )}
    />
  );
}
