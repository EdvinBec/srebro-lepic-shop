import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";
import {
  getOrdersForCurrentMonth,
  getOrdersForCurrentYear,
  getOrdersForToday,
} from "./_actions/orders";
import { Label } from "@/components/ui/label";
import AdminCard from "./_components/AdminCard";
import OrdersTable from "./_components/OrdersTable";

export const dynamic = "force-dynamic";

type Props = {};

// Function to get sales data
const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: {
      price: true,
    },
    _count: true,
  });

  return {
    amount: (data._sum.price || 0) / 100,
    numberOfSales: data._count,
  };
};

// Function to get user data
const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: {
        price: true,
      },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.price || 0) / userCount / 100,
  };
};

// Function to get product data
const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailabileForPurchase: true } }),
    db.product.count({ where: { isAvailabileForPurchase: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
};

// Main page component
const page = async (props: Props) => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  const thisMonthOrders = await getOrdersForCurrentMonth();
  const todayOrders = await getOrdersForToday();
  const thisYearOrders = await getOrdersForCurrentYear();
  const notShippedOrders = thisYearOrders.filter((order) => !order.isSent);

  console.log(thisYearOrders);

  return (
    <MaxWidthWrapper>
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

// Component for displaying dashboard cards
type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};
