import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import React from "react";

type Props = {
  orders: any[];
  label: string;
};

const AdminCard = ({ orders, label }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent className=" text-3xl font-bold">{orders.length}</CardContent>
      <CardFooter>
        <CardDescription className="flex items-center gap-2">
          <Label>Promet: </Label>
          {formatCurrency(
            orders.reduce((total, order) => total + order.price, 0) / 100
          )}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default AdminCard;
