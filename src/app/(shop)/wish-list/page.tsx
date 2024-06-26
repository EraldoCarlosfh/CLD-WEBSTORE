import { Badge } from "@/components/ui/badge";
import WishlistItem from "@/components/ui/wishlist-item";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Heart } from "lucide-react";
import { getServerSession } from "next-auth";

async function WishListPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus favoritos</p>
      </div>
    );
  }

  const wishlist = await prismaClient.products.findMany({
    where: {
      wishListProducts: {
        some: {
          userId: session.user.id,
        },
      },
    }, 
  });

  if (!wishlist.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Nenhum favorito!</h2>
        <p className="text-sm opacity-60">
          Adicione produtos à sua lista de favoritos
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <Heart size={16} />
        Favoritos
      </Badge>  
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        {wishlist.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default WishListPage;
