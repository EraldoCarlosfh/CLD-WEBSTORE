import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { prismaClient } from "@/lib/prisma";
interface CategoryProductsPageProps {
  params: {
    slug: string;
  };
}

const CategoryProductsPage = async ({params: { slug },}: CategoryProductsPageProps) => {
  const category = await prismaClient.categorys.findFirst({
    where: {
      slug: slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.372rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {category.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
