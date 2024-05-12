// (home) pasta com parenteses => route-grup
// não é tratada como rota
import Image from "next/image";
import Categories from "./components/categories";
import ProductHomeList from "./components/product-home-list";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";

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
      <PromoBanner
        src="/banner_discount.jpg"       
        alt="Até 55% de desconto esse mês!"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductHomeList products={deals} />
      </div>

      <PromoBanner
        src="/banner_mouses.jpg"       
        alt="Até 55% de desconto em mouses!"
      />

      <div className="mt-8">
        <SectionTitle>Mouses</SectionTitle>
        <ProductHomeList products={mouses} />
      </div>

      <PromoBanner
        src="/banner_phones.jpg"      
        alt="Até 20% de desconto em fones!"
      />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductHomeList products={keyboards} />
      </div>
    </div>
  );
};
export default Home;
