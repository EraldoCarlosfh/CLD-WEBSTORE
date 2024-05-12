import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { convertNameSlug } from "@/constants/convert-name-slug";
import { prismaClient } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {
  const products = await prismaClient.products.findMany({
    where: {
      category: {
        slug: params.slug,
      },
    },
  }); 

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.372rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {convertNameSlug(params.slug)}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
