import { Products } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductItemProps {
  product: Products;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4 max-w-[9.75rem]">
      <div className="relative flex h-[10.625rem] w-[9.75rem] items-center justify-center rounded-lg bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%] mt-4"
          src={product.imageUrls[0]}
          style={{ objectFit: "contain" }}
          width={0}
          height={0}
          sizes="100vw"
          alt={product.name}
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[0.125rem]">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </div>
      <div className={product.name.length > 18 ? 'flex flex-col gap-1' : 'flex flex-col items-start gap-1'}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                {product.name}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              {product.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">
            {product.totalPrice
              .toNumber()
              .toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
          </p>
          {product.discountPercentage > 0 && (
            <span className="text-xs opacity-75 line-through overflow-hidden text-ellipsis whitespace-nowrap">
              {product.basePrice.toNumber().toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
