import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center bg-accent mt-20 h-20 text-gray-400">
      <Copyright className="opacity-75 font-light mr-1" size={16}></Copyright>
      <span className="opacity-75 font-light mr-1">2023 Copyright</span>
      <span className="font-medium opacity-75"> CLD Web Store</span>
    </div>
  );
};

export default Footer;
