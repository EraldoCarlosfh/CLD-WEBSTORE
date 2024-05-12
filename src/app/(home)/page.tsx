// (home) pasta com parenteses => route-grup
// não é tratada como rota
import Categories from "./components/categories";
import ProductHomeList from "./components/product-home-list";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";

const HomePage = async () => {
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
    <div className="flex flex-col gap-8 py-8">
      <div>        
        <PromoBanner
          src="/banner_discount.jpg"       
          alt="Até 55% de desconto esse mês!"
        />
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductHomeList products={deals} />
      </div>

      <div>        
        <PromoBanner
          src="/banner_mouses.jpg"       
          alt="Até 55% de desconto em mouses!"
        />
      </div>

      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductHomeList products={mouses} />
      </div>

      <div>
        <PromoBanner
          src="/banner_phones.jpg"      
          alt="Até 20% de desconto em fones!"
        />
      </div>

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductHomeList products={keyboards} />
      </div>
    </div>
  );
};
export default HomePage;
