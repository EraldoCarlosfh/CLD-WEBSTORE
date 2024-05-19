import { ShoppingCart } from "lucide-react";
import IconBadge from "./icon-badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./card-item";
import { Button } from "./button";
import { Separator } from "./separator";

const Cart = () => {
  const { products, cartTotalPrice, cartBasePrice, cartTotalDiscount } =
    useContext(CartContext);
  return (
    <div className="flex flex-col gap-8">
      <IconBadge variant="outline">
        <ShoppingCart size={16} />
        Carrinho
      </IconBadge>

      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <div className="flex flex-col gap-2 text-xs opacity-80">
        <Separator />
        <div className="flex justify-between font-light">
          <span>Subtotal</span>
          <span>R$ {cartBasePrice}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-light">
          <span>Entrega</span>
          <span className="uppercase">R$ Grátis</span>
        </div>
        <Separator />
        <div className="flex justify-between font-light">
          <span>Descontos</span>
          <span>- R$ {cartTotalDiscount}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>R$ {cartTotalPrice}</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          className="w-full rounded-xl font-bold uppercase"
          variant="default"
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Cart;
