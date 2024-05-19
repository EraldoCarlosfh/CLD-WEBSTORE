"use client";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-bagde";
import { Products } from "@prisma/client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ProductInfosProps {
  product: Pick<
    Products,
    "name" | "description" | "totalPrice" | "basePrice" | "discountPercentage"
  >;
}

const ProductInfos = ({
  product: { name, description, totalPrice, basePrice, discountPercentage },
}: ProductInfosProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string>('https://xarwas4csfe8g80s.public.blob.vercel-storage.com/fast-freight-NcnClOCGNz1vxkrPPLimyUyCvIdYwD.png');

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
          {Number(totalPrice.toString()).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>
        {discountPercentage > 0 && (
          <DiscountBadge>{discountPercentage}</DiscountBadge>
        )}
      </div>
      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          {Number(basePrice.toString()).toLocaleString("pt-br", {
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

      <div className="flex items-center justify-between rounded-lg bg-accent px-5 py-8">
        <div className="flex items-center gap-2">
          <Image
            src={currentImage}
            alt="Caminhão de frete"
            height={0}
            width={60}
            sizes="100vw"
          />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold italic">CLDPacket®</span>
            </p>
            <p className="text-freight text-xs">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <h1 className="font-semibold pr-4">Frete Grátis</h1>
      </div>
    </div>
  );
};

export default ProductInfos;
