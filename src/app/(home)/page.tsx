"use client";
// (home) pasta com parenteses => route-grup
// não é tratada como rota
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        className="h-auto w-full"
        src="/banner_home.jpg"
        alt="Até 55% de desconto esse mês!"
        width={0}
        sizes="100vw"
        height={0}
        style={{borderRadius: '5rem;'}}
      />
    </div>
  );
}
