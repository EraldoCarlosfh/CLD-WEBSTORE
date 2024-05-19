import { ShoppingCart } from "lucide-react";
import IconBadge from "./icon-badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./card-item";

const Cart = () => {
  const { products } = useContext(CartContext);
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
    </div>
  );
};

export default Cart;
