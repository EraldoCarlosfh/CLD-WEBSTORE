import ProductItem from "@/components/ui/product-item";
import { Products } from "@prisma/client";
import Link from "next/link";

interface ProductHomeListProps {
  products: Products[];
}

const ProductHomeList = ({ products }: ProductHomeListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`}>
          <div className="w-[9.75rem] max-w-[9.75rem]">
            <ProductItem key={product.id} product={product} />
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductHomeList;
