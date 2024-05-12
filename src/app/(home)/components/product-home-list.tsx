import ProductItem from "@/components/ui/product-item";
import { Products } from "@prisma/client";

interface ProductHomeListProps {
  products: Products[];
}

const ProductHomeList = ({ products }: ProductHomeListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductHomeList;