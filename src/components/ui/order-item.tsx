import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { getOrderStatus } from "../../app/(shop)/orders/helpers/status";
import CartPrice from "./cart-price";

interface OrderItemProps {
  order: Prisma.OrdersGetPayload<{
    include: {
      ordersProducts: {
        include: { products: true };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subTotal = useMemo(() => {
    return order.ordersProducts.reduce((acc, ordersProducts) => {
      return (
        acc + Number(ordersProducts.products.basePrice) * ordersProducts.quantity
      );
    }, 0);
  }, [order.ordersProducts]);

  const total = useMemo(() => {
    return order.ordersProducts.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [order.ordersProducts]);

  const totalDiscounts = subTotal - total;

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex w-full text-left">
              <div className="flex flex-1 flex-col gap-1 text-left">
                <p className="text-sm font-bold uppercase lg:text-base">
                  Pedido com {order.ordersProducts.length} produto(s)
                </p>
                <span className="text-xs opacity-60">
                  Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
                </span>
              </div>

              <div className="hidden flex-1 font-bold lg:block">
                <p className="text-xs lg:text-sm">Status</p>
                <p className="text-xs text-[#8162FF] lg:text-sm">
                  {getOrderStatus(order.status)}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm ">Data</p>
                <p className="text-xs opacity-60 lg:text-sm">
                  {format(order.createdAt, "d/MM/y")}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between lg:hidden">
                <div className="font-bold">
                  <p className="text-xs lg:text-sm">Status</p>
                  <p className="text-xs text-[#8162FF] lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Data</p>
                  <p className="text-xs opacity-60 lg:text-sm">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                  <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
                </div>
              </div>

              {order.ordersProducts.map((ordersProducts) => (
                <OrderProductItem
                  key={ordersProducts.id}
                  ordersProducts={ordersProducts}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />
                <CartPrice
                  className="w-full py-3 lg:text-sm"
                  price={subTotal}
                  title={"Subtotal"}
                  isDiscount={false}
                />
                <Separator />
                <CartPrice
                  className="w-full py-3 lg:text-sm"
                  price={"Grátis"}
                  title={"Entrega"}
                  isDiscount={false}
                />
                <Separator />
                <CartPrice
                  className="w-full py-3 lg:text-sm"
                  price={totalDiscounts}
                  title={"Descontos"}
                  isDiscount={true}
                />
                <Separator />
                <CartPrice
                  className="w-full py-3 text-sm font-bold lg:text-base"
                  price={total}
                  title={"Total"}
                  isDiscount={false}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
