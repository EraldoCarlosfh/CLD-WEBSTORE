import { Categorys } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";

interface CategoryItemProps {
  category: Categorys;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge variant="outline"
      className="flex items-center justify-center gap-2 py-3 rounded-lg"
    >
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="tex-xs font-bold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;
