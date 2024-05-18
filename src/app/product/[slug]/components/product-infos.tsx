"use client";
import ProductHomeList from "@/app/(home)/components/product-home-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/section-title";
import { Products } from "@prisma/client";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfosProps {
  product: Pick<
    Products,
    "name" | "description" | "totalPrice" | "basePrice" | "discountPercentage"
  >;
  deals: Products[];
}

const ProductInfos = ({
  product: { name, description, totalPrice, basePrice, discountPercentage },
  deals,
}: ProductInfosProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  function handlerDecreaseQuantityClick() {
    setQuantity((prev) => (prev == 1 ? prev : prev - 1));
  }

  function handlerIncreaseQuantityClick() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          {Number(totalPrice).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>
        {discountPercentage > 0 && (
          <Badge className="px-2 py-[0.125rem]">
            <ArrowDownIcon size={14} />
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>
      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          {Number(basePrice).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3">
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => handlerDecreaseQuantityClick()}
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => handlerIncreaseQuantityClick()}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h1 className="text-lg">Descrição</h1>
        <p className="whitespace-pre-line text-justify text-sm font-light opacity-60">
          {description}
        </p>
      </div>

      <Button
        className="mb-5 mt-4 font-semibold uppercase"
        onClick={() => quantity}
      >
        Adicionar ao carrinho
      </Button>

      <div className="flex items-center justify-around rounded-lg bg-accent px-5 py-8">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold italic">CLDPacket®</span>
            </p>
            <p className="text-freight text-xs">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <h1 className="font-semibold">Frete Grátis</h1>
      </div>
      <div className="mb-6 mt-5 ">
        <SectionTitle className="mb-3 pl-2 font-bold uppercase">
          Produtos Recomendados
        </SectionTitle>
        <ProductHomeList products={deals} />
      </div>
    </div>
  );
};

export default ProductInfos;
