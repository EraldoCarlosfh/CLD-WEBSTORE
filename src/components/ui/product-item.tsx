import { Products } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
interface ProductItemProps {
  product: Products;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[10.625rem] w-full items-center justify-center rounded-lg bg-accent">
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
            <Badge className="absolute left-3 top-3 px-2 py-[0.125rem]">
              <ArrowDownIcon size={14} />
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {/* <TooltipProvider>
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
        </TooltipProvider> */}
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">
              {product.totalPrice
                .toNumber()
                .toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
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
    </Link>
  );
};

export default ProductItem;
