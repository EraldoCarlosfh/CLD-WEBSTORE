import { KeyboardIcon } from "lucide-react";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="mt-2 flex items-center pl-5 text-xl font-bold uppercase">
      <KeyboardIcon className="mr-1" size={18} /> {title}
    </div>
  );
};

export default SectionTitle;
