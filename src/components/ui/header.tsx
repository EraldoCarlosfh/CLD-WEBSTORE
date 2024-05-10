"use client";

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
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
  const { status, data } = useSession();

  const handlerLoginClick = async () => {
    await signIn();
  };

  const handlerLogoutClick = async () => {
    await signOut();
  };
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
          {status == "authenticated" && data?.user && (
            <div className="flex items-center gap-2 py-3">
              <Avatar>
                <AvatarFallback>
                  {data?.user?.name?.[0].toUpperCase()}
                </AvatarFallback>

                {data?.user?.image && <AvatarImage width="45" style={{ borderRadius: 25, border: "1px solid white" }} src={data?.user?.image} />}
              </Avatar>

              <div className="flex-col text-center">
                <p className="font-medium">{data?.user?.name}</p>
                <p className="text-sm opacity-75">Boas compras!</p>
              </div>
            </div>         
          )}

          <div className="mt-2 flex flex-col gap-2">
            {status == "unauthenticated" ? (
              <Button
                size="icon"
                variant="default"
                onClick={handlerLoginClick}
                className="w-full p-2 justify-start gap-1.5"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            ) : (
              <>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={handlerLogoutClick}
                  className="w-full p-2 justify-start gap-1.5"
                >
                  <LogOutIcon size={16}></LogOutIcon>Sair
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-full p-2 justify-start gap-1.5"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-full p-2 justify-start gap-1.5"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-full p-2 justify-start gap-1.5"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </>
            )}
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
