"use client";

import React, { useState, useEffect } from "react";
import ProductsGallery from "./ProductsGallery";
import DropdownButtonShadcn from "@/components/Button/DropdownButtonShadcn";
import SizePicker from "./SizePicker";
import PriceRangePicker from "./PriceRangePicker";
import { Product } from "@prisma/client";

type Props = {
  slug: string;
  products: Product[];
};

const ProductSortAndGallery = ({ slug, products }: Props) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortSystem, setSortSystem] = useState("random");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by price range
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.priceInCents >= priceRange[0] &&
        product.priceInCents <= priceRange[1]
    );

    // Sort products
    switch (sortSystem) {
      case "priceDesc":
        updatedProducts.sort((a, b) => a.priceInCents - b.priceInCents);
        break;
      case "priceAsc":
        updatedProducts.sort((a, b) => b.priceInCents - a.priceInCents);
        break;
      default:
        // Implement any default or random sorting if needed
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [priceRange, sortSystem, products]);

  return (
    <div className="w-full">
      <div className="flex gap-5 ml-2 flex-wrap">
        <DropdownButtonShadcn
          label="Poredaj po"
          onSave={(item) => setSortSystem(item)}
        />

        <PriceRangePicker onSubmit={(prices) => setPriceRange(prices)} />
      </div>
      <ProductsGallery products={filteredProducts} />
    </div>
  );
};

export default ProductSortAndGallery;
