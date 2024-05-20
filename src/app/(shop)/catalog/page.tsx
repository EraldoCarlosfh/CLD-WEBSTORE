import { ListIcon } from "lucide-react";
import CategoryItem from "./components/category-item";
import { prismaClient } from "@/lib/prisma";
import IconBadge from "@/components/ui/icon-badge";

const CatalogPage = async () => {
  const categorys = await prismaClient.categorys.findMany({});

  return (
    <div className="flex flex-col gap-8 p-5">
      <IconBadge variant="heading">
        <ListIcon size={16} />
        Catálogo
      </IconBadge>

      <div className="grid grid-cols-2 gap-8">
        {categorys.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
