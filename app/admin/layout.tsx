import AdminNavigation, {
  NavLink,
} from "@/components/NavigationBar/AdminNavigation";
import React from "react";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <AdminNavigation className="mt-4 border-y-[1px] py-2 print:hidden">
        <NavLink href="/admin">Početak</NavLink>
        <NavLink href="/admin/products">Artkili</NavLink>
        <NavLink href="/admin/orders">Narudžbe</NavLink>
      </AdminNavigation>
      {children}
    </>
  );
};

export default layout;
