import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { LucideCheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductActions";
import Sidebar from "./_components/Sidebar";
import Image from "next/image";
import Button from "@/components/Button/Button";

type Props = {};

const page = async (props: Props) => {
  const products = await db.product.findMany();

  return (
    <MaxWidthWrapper>
      <div className="flex gap-4 justify-between items-end">
        <Heading className="mt-8" side="left" star={false}>
          Artikli
        </Heading>
        <Button variant="secondary">
          <Link href="/admin/products/new">Dodaj novi artikal</Link>
        </Button>
      </div>
      <div className="mt-12 flex gap-8">
        <Sidebar />
        <ProdcutsTable />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

export const ProdcutsTable = async ({
  className,
  category,
}: {
  className?: string;
  category?: string;
}) => {
  const filterCondition = category ? { category } : {};

  const products = await db.product.findMany({
    where: filterCondition,
    select: {
      id: true,
      name: true,
      priceInCents: true,
      image: true,
      isAvailabileForPurchase: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) {
    return <div className="text-center">Nema artikala</div>;
  }

  return (
    <Table className={cn(className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for Purchase</span>
          </TableHead>
          <TableHead>Slika</TableHead>
          <TableHead>Ime artikla</TableHead>
          <TableHead>Cijena</TableHead>
          <TableHead>Narudžbe</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          return (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailabileForPurchase ? (
                  <>
                    <LucideCheckCircle2 />
                    <span className="sr-only">Availabile</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500" />
                    <span className="sr-only">Unavailabile</span>
                  </>
                )}
              </TableCell>
              <TableCell>
                <Image
                  src={product.image}
                  height={60}
                  width={60}
                  alt="Product image"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.priceInCents)}</TableCell>
              <TableCell>{formatNumber(product._count.orderItems)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/${product.id}`}>Pogledaj</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        Uredi
                      </Link>
                    </DropdownMenuItem>
                    <ActiveToggleDropdownItem
                      id={product.id}
                      isAvailabileForPurchase={product.isAvailabileForPurchase}
                    />
                    <DropdownMenuSeparator />
                    <DeleteDropdownItem
                      id={product.id}
                      disabled={product._count.orderItems > 0}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
