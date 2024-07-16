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
import { Check, LucideCheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  ActiveToggleDropdownItem,
  AddDiscountDrawer,
  DeleteDropdownItem,
  FeaturedToggleDropdownItem,
  RemoveDiscountDropdown,
} from "./_components/ProductActions";
import Sidebar from "./_components/Sidebar";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { removeDiscount } from "../_actions/products";

type Props = {};

const page = async (props: Props) => {
  return (
    <MaxWidthWrapper>
      <div className="flex gap-4 justify-between items-end">
        <Heading className="mt-8" side="left" star={false}>
          Artikli
        </Heading>
        <Link href="/admin/products/new">
          <Button variant="secondary">Dodaj novi artikal</Button>
        </Link>
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
      isFeatured: true,
      oldPrice: true,
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
    <Drawer>
      <Table className={cn(className)}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only">Available for Purchase</span>
            </TableHead>
            <TableHead>Slika</TableHead>
            <TableHead>Ime artikla</TableHead>
            <TableHead className="text-center">Cijena</TableHead>
            <TableHead>Narudžbe</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <>
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
                      src={product.image[0]}
                      height={60}
                      width={60}
                      alt="Product image"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="flex flex-col items-center">
                    <span className={`${product.oldPrice == 0 && "mt-4"}`}>
                      <span
                        className={`${
                          product.oldPrice != 0 && "text-destructive"
                        }`}
                      >
                        {formatCurrency(product.priceInCents)}
                      </span>
                    </span>
                    <span className={` ${product.oldPrice === 0 && "hidden"}`}>
                      {formatCurrency(product.oldPrice)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatNumber(product._count.orderItems)}
                  </TableCell>
                  <TableCell>
                    {product.isFeatured && (
                      <LucideCheckCircle2
                        className="text-accentYellow"
                        size={20}
                      />
                    )}
                  </TableCell>
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
                        <FeaturedToggleDropdownItem
                          id={product.id}
                          isFeatured={product.isFeatured}
                        />
                        <ActiveToggleDropdownItem
                          id={product.id}
                          isAvailabileForPurchase={
                            product.isAvailabileForPurchase
                          }
                        />
                        <DropdownMenuSeparator />
                        <DeleteDropdownItem
                          id={product.id}
                          disabled={product._count.orderItems > 0}
                        />
                        <DropdownMenuItem>
                          <DrawerTrigger>Dodaj popust</DrawerTrigger>
                        </DropdownMenuItem>
                        <RemoveDiscountDropdown
                          id={product.id}
                          oldPrice={product.oldPrice}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <AddDiscountDrawer
                  id={product.id}
                  oldPrice={product.priceInCents}
                />
              </>
            );
          })}
        </TableBody>
      </Table>
    </Drawer>
  );
};
