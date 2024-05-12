// (home) pasta com parenteses => route-grup
// não é tratada como rota
import Image from "next/image";
import Categories from "./components/categories";
import ProductHomeList from "./components/product-home-list";
import { prismaClient } from "@/lib/prisma";
import { KeyboardIcon, MouseIcon, PercentCircleIcon } from "lucide-react";
import SectionTitle from "@/components/ui/section-title";

const Home = async () => {
  const deals = await prismaClient.products.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const mouses = await prismaClient.products.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  const keyboards = await prismaClient.products.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <div>
      <Image
        className="mt-2 h-auto w-full rounded-[2rem] p-5"
        src="/banner_home.jpg"
        alt="Até 55% de desconto esse mês!"
        width={0}
        sizes="100vw"
        height={0}
      />
      <div className="p-5">
        <Categories />
      </div>
      <div className="mt-2 flex items-center pl-5 text-xl font-bold uppercase">
        <PercentCircleIcon className="mr-1" size={18} /> Ofertas
      </div>
      <div className="mt-6">
        <ProductHomeList products={deals} />
      </div>
      <Image
        className="mt-4 h-auto w-full rounded-[2rem] p-5"
        src="/banner_home2.jpg"
        alt="Até 55% de desconto em mouses!"
        width={0}
        sizes="100vw"
        height={0}
      />
      <div className="mt-2 flex items-center pl-5 text-xl font-bold uppercase">
        <MouseIcon className="mr-1" size={18} /> Mouses
      </div>
      <div className="mt-6">
        <ProductHomeList products={mouses} />
      </div>
      <Image
        className="mt-4 h-auto w-full rounded-[2rem] p-5"
        src="/banner_home3.jpg"
        alt="Até 20% de desconto em fones!"
        width={0}
        sizes="100vw"
        height={0}
      />
      <SectionTitle title="Teclados"/>
      <div className="mt-6">
        <ProductHomeList products={keyboards} />
      </div>
    </div>
  );
};
export default Home;
