import { Products } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn, formatedPrice } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

interface ProductItemProps {
  product: Products;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("flex min-w-[156px] flex-col gap-4", className)}
      href={`/product/${product.slug}`}
    >
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[10.625rem] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
          />
          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
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
              <TooltipContent>{product.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <p className="truncate text-sm">{product.name}</p>

          <div className="flex items-center gap-2 ">
            {product.discountPercentage > 0 ? (
              <>
                <p className="truncate font-semibold lg:text-lg">
                  {formatedPrice(Number(product.totalPrice))}
                </p>

                <p className="truncate text-xs line-through opacity-75 lg:text-sm">
                  {formatedPrice(Number(product.basePrice))}
                </p>
              </>
            ) : (
              <p className="truncate text-sm font-semibold">
                {formatedPrice(Number(product.basePrice))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
