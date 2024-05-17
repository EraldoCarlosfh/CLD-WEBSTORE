import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsPageProps) => {
  const product = await prismaClient.products.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
        <ProductImages imageUrls={product.imageUrls} productsName={product.name} />
    </div>
  );
};

export default ProductDetailsPage;
