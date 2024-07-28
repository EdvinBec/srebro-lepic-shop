"use client";

import Button from "@/components/Button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatWeight } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";
import { FancyMultiSelect, OPTION } from "@/components/ui/multi-select";
import { RingSizePicker } from "../../_components/RingSizePicker";
import { NecklaceSizePicker } from "../../_components/NecklaceSizePicker";

type Props = {
  className?: string;
  product?: Product | null;
};

const ProductForm = ({ className, product }: Props) => {
  const [error, action] = useFormState(
    !product ? addProduct : updateProduct.bind(null, product!.id),
    {}
  );
  const [selectedSize, setSelectedSize] = useState<number[]>();
  const [category, setCategory] = useState(product?.category || "prstenje");
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );
  const [weight, setWeight] = useState<number | undefined>(
    product?.weightInGrams
  );

  const setSize = (size: number[]) => {
    setSelectedSize(size);
  };

  return (
    <form action={action} className={cn(className, "space-y-8")}>
      <div className="space-y-2">
        <Label htmlFor="name">Ime artikla</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error!.name && <div className="text-destructive">{error!.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Cijena</Label>
        <Input
          type="float"
          id="priceInCents"
          name="priceInCents"
          required
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          defaultValue={product?.priceInCents || ""}
        />
        <div className="text-muted-foreground">
          {formatCurrency(priceInCents || 0)}
        </div>
        {error!.priceInCents && (
          <div className="text-destructive">{error!.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Opis artikla</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {error!.description && (
          <div className="text-destructive">{error!.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="catefory">Kategorija</Label>
        <select
          name="category"
          id="catefory"
          className="block border-[1px] px-4 py-2"
          defaultValue={product?.category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="prstenje">Prstenje</option>
          <option value="ogrlice">Ogrlice</option>
          <option value="nausnice">Nausnice</option>
          <option value="satovi">Satovi</option>
          <option value="sa-porukom">Sa porukom</option>
        </select>
        {error!.category && (
          <div className="text-destructive">{error!.category}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="weight">Težina u gramima</Label>
        <Input
          type="float"
          id="weight"
          name="weight"
          required
          onChange={(e) => setWeight(Number(e.target.value) || undefined)}
          defaultValue={product?.weightInGrams || ""}
        />
        <div className="text-muted-foreground">{formatWeight(weight || 0)}</div>
        {error!.weight && (
          <div className="text-destructive">{error!.weight}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="sizes">Dostupne veličine</Label>
        <div className={category === "prstenje" ? "block" : "hidden"}>
          <RingSizePicker save={setSize} prevSizes={product?.availableSizes!} />
        </div>
        <input
          type="hidden"
          name="sizes"
          multiple
          value={selectedSize?.join(",")}
        />
        {error!.sizes && <div className="text-destructive">{error!.sizes}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Slika</Label>
        <Input
          type="file"
          id="image"
          name="image"
          multiple
          required={product == null}
        />
        {product != null && (
          <Image
            src={product.image[0]}
            height={200}
            width={200}
            alt="Product Image"
          />
        )}
        {error!.image && <div className="text-destructive">{error!.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
};

export default ProductForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="secondary" disabled={pending}>
      {pending ? "Dodavanje..." : "Dodaj artikal"}
    </Button>
  );
};
