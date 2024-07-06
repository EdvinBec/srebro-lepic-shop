import React from "react";
import { getOrdersForCurrentYear } from "../_actions/orders";
import OrdersTable from "../_components/OrdersTable";

type Props = {};

const page = async (props: Props) => {
  const thisYearOrders = await getOrdersForCurrentYear();

  return (
    <div>
      <OrdersTable orders={thisYearOrders} />
    </div>
  );
};

export default page;
