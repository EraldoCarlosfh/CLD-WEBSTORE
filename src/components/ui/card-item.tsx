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
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-lg bg-accent lg:h-[120px] lg:w-[120px]">
          <Image
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-xs font-light lg:text-sm">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold lg:text-base">
              {formatedPrice(Number(product.totalPrice))}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 lg:text-sm">
                {formatedPrice(Number(product.basePrice))}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 lg:gap-3">
            <Button
              className="h-8 w-8 lg:h-9 lg:w-9"
              size={"icon"}
              variant="outline"
              onClick={() => handlerDecreaseQuantityClick()}
            >
              <ArrowLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              className="h-8 w-8 lg:h-9 lg:w-9"
              size={"icon"}
              variant="outline"
              onClick={() => handlerIncreaseQuantityClick()}
            >
              <ArrowRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="pr-3">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handlerRemoveProductClick(product.id)}
          className="h-8 w-8 lg:h-9 lg:w-9"
        >
          <Trash2 className="h-4 w-4 lg:h-5 lg:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
