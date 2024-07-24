import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import {
  getOrdersForCurrentMonth,
  getOrdersForCurrentYear,
  getOrdersForToday,
} from "./_actions/orders";
import AdminCard from "./_components/AdminCard";
import OrdersTable from "./_components/OrdersTable";
import db from "@/db/db";

import AttentionRowChange from "./_components/AttentionRowChange";

export const dynamic = "force-dynamic";

type Props = {};

// Main page component
const page = async (props: Props) => {
  const thisMonthOrders = await getOrdersForCurrentMonth();
  const todayOrders = await getOrdersForToday();
  const thisYearOrders = await getOrdersForCurrentYear();
  const notShippedOrders = thisYearOrders.filter((order) => !order.isSent);
  const shopSettings = await db.shopSettings.findUnique({
    where: { id: 1 },
  });

  return (
    <MaxWidthWrapper>
      <AttentionRowChange message={shopSettings?.attentionMessage!} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminCard orders={thisYearOrders} label="Broj narudžbi ove godine" />
        <AdminCard
          orders={thisMonthOrders}
          label="Broj narudžbi ovog mjeseca"
        />
        <AdminCard orders={todayOrders} label="Broj narudžbi danas" />
        <AdminCard orders={notShippedOrders} label="Neobradjene narudžbe" />
      </div>
      <OrdersTable orders={thisYearOrders.filter((order) => !order.isSent)} />
    </MaxWidthWrapper>
  );
};

export default page;
