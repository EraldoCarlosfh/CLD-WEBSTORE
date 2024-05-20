import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";
import ProductInfos from "./components/product-infos";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const session = await getServerSession(authOptions);  

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver detalhes de produtos</p>
      </div>
    );
  }

  const product = await prismaClient.products.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  const wishListProducts = await prismaClient.wishListProducts.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9  lg:px-5">
        <ProductImages product={product} />
        <ProductInfos product={product} wishListProducts={wishListProducts} />
      </div>
      <div className="flex flex-col gap-5">
        <SectionTitle className="pl-5">Produtos Recomendados</SectionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
