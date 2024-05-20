import { Categorys } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Categorys;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  // Exemplo de Gradiente com Tailwind
  //<div className="to-[rgba(80, 51, 195, 0.20)] flex h-[9.375rem] w-full items-center justify-center
  // rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-[#5033C3]"
  // >
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div
          className="bg-category-background-gradient flex h-[9.375rem] w-full items-center justify-center rounded-tl-lg 
          rounded-tr-lg"
        >
          <Image
             className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
