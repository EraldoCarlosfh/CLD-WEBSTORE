import { prismaClient } from "@/lib/prisma";

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
    <div className="flex flex-col gap-8 p-5">
        <p className="text-semibold">{slug}</p>
    </div>
  );
};

export default ProductDetailsPage;
