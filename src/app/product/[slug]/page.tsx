import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfos from "./components/product-infos";

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
      category: true,
    },
  });

  const deals = await prismaClient.products.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages product={product} />
      <ProductInfos product={product} deals={deals} />
    </div>
  );
};

export default ProductDetailsPage;
