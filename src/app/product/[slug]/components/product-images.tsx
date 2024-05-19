"use client";
import { Button } from "@/components/ui/button";
import { Products } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  product: Pick<Products, "imageUrls" | "name">;
}

const ProductImages = ({ product: {name, imageUrls}}: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState<string>(imageUrls[0]);

  const handlerImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-[23.75rem] w-full items-center justify-center bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 px-5 ">
        {imageUrls.map((imageUrl) => (
          <Button
            key={imageUrl}
            onClick={() => handlerImageClick(imageUrl)}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
                ${imageUrl == currentImage && "border-2 border-solid border-primary"}
            `}
          >
            <Image
              className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
              src={imageUrl}              
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
