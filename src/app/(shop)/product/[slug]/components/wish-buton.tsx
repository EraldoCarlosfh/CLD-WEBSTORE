"use client";

import { addProductToWishlist } from "@/actions/wishlist";
import { StarIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "@/components/ui/loading-button";
import { WishListProducts } from "@prisma/client";

interface WishButtonProps {
  productId: string;
  wishListProducts: WishListProducts[];
}
const WishButton = ({ productId, wishListProducts }: WishButtonProps) => {
  const { data: session } = useSession();

  if (wishListProducts == undefined)
    wishListProducts = [];
  
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setLoading(true);
    if (!session || !session.user) {
      toast("Você precisa estar logado para adicionar aos favoritos", {
        action: {
          label: "Login",
          onClick: () => {
            signIn();
          },
        },
        classNames: {
          toast: "bg-red-500 border-red-500",
          title: "text-white",
          actionButton: "!text-red-500 !bg-white font-bold",
        },
      });

      setLoading(false);
      return;
    }

    await addProductToWishlist(session.user.id, productId);

    router.refresh();

    toast("Produto adicionado aos favoritos", {
      action: {
        label: "Ver favoritos",
        onClick: () => {
          router.push("/wish-list");
        },
      },
    });

    setLoading(false);
  };

  return (
    <LoadingButton
      loading={loading}
      textWaiting="Adicionando aos favoritos"
      className="uppercase"
      onClick={handleAddToWishlist}
    >
      <StarIcon
        className={"h-5 w-5 " + (wishListProducts.length > 0 && "fill-white")}
      />
      Favoritos
    </LoadingButton>
  );
};

export default WishButton;
