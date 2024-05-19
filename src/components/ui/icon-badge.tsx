import { Badge, BadgeProps } from "./badge";
import { cn } from "@/lib/utils";

const IconBadge = ({children, className, ...props}: BadgeProps) => {
  return (
    <Badge
      className={cn("w-fit gap-1 border-2 border-primary px-3 py-[0.372rem] text-base uppercase", className)}
      {...props}
    >
     {children}
    </Badge>
  );
};

export default IconBadge;