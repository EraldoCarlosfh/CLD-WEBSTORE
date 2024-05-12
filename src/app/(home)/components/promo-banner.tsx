import Image, { ImageProps } from "next/image";

const PromoBanner = ({alt, ...props}: ImageProps) => {
  return (
    <Image
      className="mt-4 h-auto w-full p-5"
      alt={alt} 
      width={0}
      sizes="100vw"
      height={0}
      {...props}
    />
  );
};

export default PromoBanner;
