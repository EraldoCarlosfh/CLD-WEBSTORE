"use client";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
  WalletIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import Image from "next/image";
import { CartContext, CartProduct } from "@/providers/cart";
import { formatedPrice } from "@/lib/utils";
import WishButton from "./wish-buton";
import { Products, WishListProducts } from "@prisma/client";
import { toast } from "react-toastify";
import { createCheckout } from "@/actions/checkout";
import { createOrder } from "@/actions/order";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

interface ProductInfosProps {
  product: Products;
  wishListProducts: WishListProducts[];
}

const ProductInfos = ({ product, wishListProducts }: ProductInfosProps) => {
  const { data } = useSession();
  const [quantity, setQuantity] = useState<number>(1);
  const { addProductsToCart } = useContext(CartContext);
  const [currentImage] = useState<string>(
    "https://xarwas4csfe8g80s.public.blob.vercel-storage.com/fast-freight-NcnClOCGNz1vxkrPPLimyUyCvIdYwD.png",
  );

  const totalPrice = Number(product.basePrice) * quantity;

  const handleFinishPurchaseClick = async (product: Products) => {
    const productCart: CartProduct[] = [];

    productCart.push({...product, quantity})
    
    toast.warning(`Redicionando para página de pagamento, Aguarde!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      pauseOnHover: false,
    });

    const order = await createOrder(productCart, (data?.user as any).id);

    const checkout = await createCheckout(productCart, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    // Criar pedido no banco
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  function handlerDecreaseQuantityClick() {
    setQuantity((prev) => (prev == 1 ? prev : prev - 1));
  }

  function handlerIncreaseQuantityClick() {
    setQuantity((prev) => prev + 1);
  }

  function handlerAddProductCartClick(product: Products) {
    addProductsToCart({ ...product, quantity });
  }

  return (
    <div className="flex flex-col px-5 lg:w-[40%] lg:rounded-lg lg:bg-accent lg:p-10">
      <h2 className="text-lg lg:text-2xl">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold lg:text-3xl">
          {formatedPrice(Number(product.totalPrice))}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75 lg:text-base">
          {formatedPrice(Number(product.basePrice))}
        </p>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => handlerDecreaseQuantityClick()}
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => handlerIncreaseQuantityClick()}
        >
          <ArrowRightIcon size={16} />
        </Button>
        <span className="ml-4 font-bold lg:text-lg">{formatedPrice(totalPrice)}</span>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h1 className="text-lg">Descrição</h1>
        <p className="whitespace-pre-line text-justify text-sm font-light opacity-60">
          {product.description}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <WishButton
          productId={product.id}
          wishListProducts={wishListProducts}
        />

        <Button
          className="font-bold uppercase"
          onClick={() => handlerAddProductCartClick(product)}
        >
          {" "}
          <ShoppingCartIcon className="mr-2 h-5 w-5 fill-white" />
          Adicionar ao carrinho
        </Button>

        <Button
          className="font-bold uppercase"
          onClick={() => handleFinishPurchaseClick(product)}
        >
          <WalletIcon className="mr-2 h-5 w-5 fill-white" />
          Comprar agora
        </Button>
      </div>

      <div className="mt-8 flex items-center justify-between rounded-lg bg-accent px-5 py-6 lg:bg-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <Image
            src={currentImage}
            alt="Caminhão de frete"
            height={0}
            width={60}
            sizes="100vw"
          />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold italic">CLDPacket®</span>
            </p>
            <p className="text-xs text-freight">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <h1 className="pr-4 text-xs font-bold">Frete Grátis</h1>
      </div>
    </div>
  );
};

export default ProductInfos;
