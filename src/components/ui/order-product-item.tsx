import { formatedPrice } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  ordersProducts: Prisma.OrdersProductsGetPayload<{
    include: {
      products: true;
    };
  }>;
}

const OrderProductItem = ({ ordersProducts }: OrderProductItemProps) => {  

  return (
    <div className="relative flex w-full items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent lg:h-[130px] lg:w-[150px]">
        <Image
          src={ordersProducts.products.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={ordersProducts.products.name}
        />
      </div>

      <div className="flex w-full flex-col gap-1 lg:gap-2">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-[10px] lg:text-xs">
            Vendido e entregue por <span className="font-bold">FSW Store</span>
          </p>
        </div>

        <p className="text-xs lg:text-sm">{ordersProducts.products.name}</p>

        <div className="flex w-full items-center justify-between gap-1 ">
          <div className="bottom-0 flex items-center justify-center gap-1 text-right lg:absolute lg:right-0 lg:top-0 lg:my-auto lg:flex-col lg:items-end">
            <p className="text-sm font-bold lg:text-xl">
              {formatedPrice(Number(ordersProducts.products.totalPrice))}
            </p>

            {ordersProducts.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60 lg:text-sm">
                {formatedPrice(Number(ordersProducts.basePrice))}
              </p>
            )}
          </div>

          <p className="text-xs opacity-60 lg:hidden">
            Qntd: {ordersProducts.quantity}
          </p>
          <p className="hidden text-sm opacity-60 lg:block">
            Quantidade: {ordersProducts.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
