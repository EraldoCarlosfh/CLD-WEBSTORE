import { Categorys } from "@prisma/client";
import { HeadphonesIcon, KeyboardIcon, MonitorIcon, MouseIcon, SpeakerIcon, SquareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryItemProps {
  category: Categorys;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    const categoryIcon = {
        keyboards: <KeyboardIcon size={18} />,
        monitors: <MonitorIcon size={18} />,
        headphones: <HeadphonesIcon size={18} />,
        mousepads: <SquareIcon size={18} />,
        speakers: <SpeakerIcon size={18} />,
        mouses: <MouseIcon size={18} />
    };

  return (
    <Badge variant="outline"
      className="flex items-center justify-center gap-2 py-3 rounded-lg"
    >
      {categoryIcon[category.slug as keyof typeof categoryIcon]}
      <span className="tex-xs font-bold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;
