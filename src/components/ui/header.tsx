"use client";
import {
  Heart,
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
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import Cart from "./cart";
import { Separator } from "./separator";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";

const Header = () => {
  const { status, data } = useSession();

  const { products } = useContext(CartContext);

  const cartQuantityItems = products.length;

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
        <SheetContent side="left" className="w-[21.875rem]">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status == "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data?.user?.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data?.user?.image && (
                    <AvatarImage
                      width="45"
                      style={{ borderRadius: 25, border: "1px solid white" }}
                      src={data?.user?.image}
                    />
                  )}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data?.user?.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-2 flex flex-col gap-2">
            {status == "unauthenticated" ? (
              <SheetClose asChild>
                <Button
                  size="icon"
                  variant="default"
                  onClick={handlerLoginClick}
                  className="w-full justify-start gap-2 p-2"
                >
                  <LogInIcon size={16} />
                  Fazer Login
                </Button>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={handlerLogoutClick}
                    className="w-full justify-start gap-2 p-2"
                  >
                    <LogOutIcon size={16}></LogOutIcon>Sair
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={`/`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-full justify-start gap-2 p-2"
                    >
                      <HomeIcon size={16} />
                      Início
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/deals">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-full justify-start gap-2 p-2"
                    >
                      <PercentIcon size={16} />
                      Ofertas
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={`/catalog`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-full justify-start gap-2 p-2"
                    >
                      <ListOrderedIcon size={16} />
                      Catálogo
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={`/wish-list`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-full justify-start gap-2 p-2"
                    >
                      <Heart size={16} />
                      Favoritos
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Link href={`/`}>
        <h1 className="text-xl font-semibold">
          <span className="text-primary">CLD </span>Web Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="relative">
            {cartQuantityItems > 0 && (
              <span className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold">
                {cartQuantityItems}
              </span>
            )}
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[350px] lg:w-[600px] lg:max-w-[600px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
