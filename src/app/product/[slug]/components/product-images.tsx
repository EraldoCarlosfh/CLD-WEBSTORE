"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  imageUrls: string[];
  productsName: string;
}

const ProductImages = ({ imageUrls, productsName }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState<string>(imageUrls[0]);
  // setCurrentImage(imageUrls[0]);

  const handlerImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-[23.75rem] w-full items-center justify-center bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          src={currentImage}
          alt={productsName}
          height={0}
          width={0}
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 px-5 ">
        {imageUrls.map((imageUrl) => (
          <Button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
                ${imageUrl == currentImage && "border-2 border-solid border-primary"}
            `}
          >
            <Image
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              src={imageUrl}
              onClick={() => handlerImageClick(imageUrl)}
              alt={productsName}
              height={0}
              width={0}
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
