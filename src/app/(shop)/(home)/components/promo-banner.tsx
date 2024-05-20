import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

const PromoBanner = ({alt, className, ...props}: ImageProps) => {
  return (
    <Image
      className={cn("h-auto w-full", className)}
      alt={alt} 
      width={0}
      sizes="100vw"
      height={0}
      {...props}
    />
  );
};

export default PromoBanner;
