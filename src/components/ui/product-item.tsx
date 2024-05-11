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
    <div className="flex flex-col gap-4 max-w-[156px]">
      <div className="relative flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          src={product.imageUrls[0]}
          style={{ objectFit: "contain" }}
          width={0}
          height={0}
          sizes="100vw"
          alt={product.name}
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-[156px] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {product.name}
            </TooltipTrigger>
            <TooltipContent>
              {product.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold">
            {product.totalPrice
              .toNumber()
              .toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
          </p>
          {product.discountPercentage > 0 && (
            <span className="text-xs opacity-75 line-through">
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
