import Link from "next/link";
import CategoryItem from "./category-items";
import { prismaClient } from "@/lib/prisma";

const Categories = async () => {
  const categories = await prismaClient.categorys.findMany({});
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`}>
          <CategoryItem category={category} />
        </Link>
      ))}
    </div>
  );
};

export default Categories;
