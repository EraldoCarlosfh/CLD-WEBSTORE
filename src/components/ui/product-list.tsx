import ProductItem from "@/components/ui/product-item";
import { Products } from "@prisma/client";
import Link from "next/link";

interface ProductListProps {
  products: Products[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={{
            ...product,
            totalPrice: product.totalPrice,
          }}
          className="w-[156px] lg:w-[200px] lg:min-w-[200px]"
        />
      ))}
    </div>
  );
};
export default ProductList;
