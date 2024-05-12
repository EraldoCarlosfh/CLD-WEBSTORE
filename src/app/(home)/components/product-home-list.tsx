import ProductItem from "@/components/ui/product-item";
import { Products } from "@prisma/client";

interface ProductHomeListProps {
  products: Products[];
}

const ProductHomeList = ({ products }: ProductHomeListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <div key={product.id} className="w-[9.75rem] max-w-[9.75rem]">
          <ProductItem key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};
export default ProductHomeList;