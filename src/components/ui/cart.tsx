import { ShoppingCart } from "lucide-react";
import IconBadge from "./icon-badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./card-item";
import { Button } from "./button";
import { Separator } from "./separator";
import CartPrice from "./cart-price";
import { useSession } from "next-auth/react";
import { ScrollArea } from "./scroll-area";
import { createOrder } from "@/actions/order";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const Cart = () => {
  const { data } = useSession();
  const { products, subTotal, totalDiscount, total } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      // TODO: redirecionar para o login
      return;
    }

    toast.warning(`Redirecionamento para página de pagamento, Aguarde!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      pauseOnHover: false,
    });

    const order = await createOrder(products, (data?.user as any).id);

    console.log('Order: ', order);

    const checkout = await createCheckout(products, order.id);

    console.log('Checkout: ', checkout);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    console.log('Stripe: ', stripe);

    // Criar pedido no banco

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <IconBadge variant="heading">
        <ShoppingCart size={16} />
        Carrinho
      </IconBadge>

      {/* RENDERIZAR OS PRODUTOS */}
      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={{
                    ...product,
                    totalPrice: product.totalPrice,
                  }}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Carrinho vazio. Vamos fazer compras?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />
          <CartPrice
            className={"items-center text-xs lg:text-sm"}
            price={subTotal}
            title={"Subtotal"}
            isDiscount={false}
          />
          <Separator />
          <CartPrice
            className={"items-center text-xs lg:text-sm"}
            price={"Grátis"}
            title={"Entrega"}
            isDiscount={false}
          />
          <Separator />
          <CartPrice
            className={"items-center text-xs lg:text-sm"}
            price={totalDiscount}
            title={"Descontos"}
            isDiscount={true}
          />
          <Separator />
          <CartPrice
            className={"items-center text-xs lg:text-sm"}
            price={total}
            title={"Total"}
            isDiscount={false}
          />

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};
export default Cart;
