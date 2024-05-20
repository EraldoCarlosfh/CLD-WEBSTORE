import { Prisma } from "@prisma/client";
import Image from "next/image";
import DiscountBadge from "./discount-badge";
import { cn, formatedPrice } from "@/lib/utils";
import Link from "next/link";

interface WishlistItemProps {
  product: Prisma.ProductsGetPayload<{
    include: {
      wishLists: true;
    };
  }>;
}

const WishlistItem = ({ product }: WishlistItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex aspect-square h-40 w-40 items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            alt={product.name}
          />
          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute right-[4.5rem] top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex w-40 flex-col gap-1">
          <div className="flex">
            <p className="truncate text-sm">{product.name}</p>
          </div>
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

export default WishlistItem;
