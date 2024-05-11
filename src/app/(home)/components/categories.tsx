import CategoryItem from "./category-items";
import { prismaClient } from "@/lib/prisma";

const Categories = async () => {
  const categories = await prismaClient.categorys.findMany({});
    return ( 
       <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {categories.map(category => <CategoryItem key={category.id} category={category}/>)}
       </div>
     );
}
 
export default Categories;