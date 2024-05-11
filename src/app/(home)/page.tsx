// (home) pasta com parenteses => route-grup
// não é tratada como rota
import Image from "next/image";
import Categories from "./components/categories";
import ProductHomeList from "./components/product-home-list";
import { prismaClient } from "@/lib/prisma";
import { PercentCircleIcon, PercentIcon } from "lucide-react";

const Home = async () => {
  const deals = await prismaClient.products.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div>
      <Image
        className="h-auto w-full rounded-[2rem] p-5"
        src="/banner_home.jpg"
        alt="Até 55% de desconto esse mês!"
        width={0}
        sizes="100vw"
        height={0}
      />
      <div className="p-5">
        <Categories />
      </div>
      <div className="flex items-center text-2xl font-bold p-5">
        <PercentCircleIcon className="mr-1" size={20} /> Ofertas
      </div>
      <div className="mt-4">
        <ProductHomeList products={deals} />
      </div>
    </div>
  );
};
export default Home;
