import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./sheet";

const Header = () => {
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          <div className="mt-2 flex flex-col gap-2">
            <Button size="icon" variant="default"
              className="w-full p-2 justify-start gap-1.5"
            >
              <LogInIcon size={16} />
              Fazer Login
            </Button>
            <Button size="icon" variant="outline"
              className="w-full p-2 justify-start gap-1.5"
            >
              <HomeIcon size={16} />
              Início
            </Button>
            <Button size="icon" variant="outline"
              className="w-full p-2 justify-start gap-1.5"
            >
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <Button size="icon" variant="outline"
              className="w-full p-2 justify-start gap-1.5"
            >
              <ListOrderedIcon size={16} />
              Catálogo
            </Button>
            {/* <Button size="icon" variant="destructive" className="w-full p-2 justify-start gap-1.5">
                <LogOutIcon size={16}></LogOutIcon>Sair
            </Button> */}
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="font-semibold text-lg">
        <span className="text-primary">CLD </span>Web Store
      </h1>
      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
