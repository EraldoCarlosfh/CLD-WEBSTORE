import { CartProduct } from "@/providers/cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { Button } from "./button";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, Trash2 } from "lucide-react";
import { formatedPrice } from "@/lib/utils";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { removeProductsToCart, updateQuantityProduct } =
    useContext(CartContext);

  function handlerDecreaseQuantityClick() {
    product.quantity -= 1;
    updateQuantityProduct(product);
  }

  function handlerIncreaseQuantityClick() {
    product.quantity += 1;
    updateQuantityProduct(product);
  }

  const handlerRemoveProductClick = (productId: string) => {
    removeProductsToCart(productId);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-lg bg-accent">
          <Image
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-light">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              {formatedPrice(Number(product.totalPrice))}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                {formatedPrice(Number(product.basePrice))}
              </p>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Button
              className="h-8 w-8"
              size={"icon"}
              variant="outline"
              onClick={() => handlerDecreaseQuantityClick()}
            >
              <ArrowLeftIcon size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              className="h-8 w-8"
              size={"icon"}
              variant="outline"
              onClick={() => handlerIncreaseQuantityClick()}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="pr-3">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handlerRemoveProductClick(product.id)}
          className="flex items-center"
        >
          <Trash2 size={16}></Trash2>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
