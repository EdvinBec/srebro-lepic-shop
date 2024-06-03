import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { format } from "path";
import React from "react";

type Props = {};

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: {
      pricePaidInCents: true,
    },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
};

const getUsetData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: {
        pricePaidInCents: true,
      },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
};
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

const page = async (props: Props) => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUsetData(),
    getProductData(),
  ]);

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Sales"
          subtitle={formatNumber(salesData.numberOfSales)}
          body={formatCurrency(salesData.amount)}
        />
        <DashboardCard
          title="Customers"
          subtitle={
            formatCurrency(userData.averageValuePerUser) +
            " Average value per user"
          }
          body={formatNumber(userData.userCount)}
        />
        <DashboardCard
          title="Products"
          subtitle={formatNumber(productData.inactiveCount) + " Inactive"}
          body={formatNumber(productData.activeCount) + " Active"}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

export const DashboardCard = ({
  title,
  subtitle,
  body,
}: DashboardCardProps) => {
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
