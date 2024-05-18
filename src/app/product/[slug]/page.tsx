import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfos from "./components/product-infos";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.products.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              discountPercentage: {
                gt: 0,
              },
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages product={product} />
      <ProductInfos product={product} />
      <SectionTitle className="mb-0 pl-5 font-bold uppercase">
        Produtos Recomendados
      </SectionTitle>
      <ProductList products={product.category.products} />
    </div>
  );
};

export default ProductDetailsPage;
