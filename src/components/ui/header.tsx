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
import { toast } from "react-toastify";

const Header = () => {
  const { status, data } = useSession();

  const handlerLoginClick = async () => {
    await signIn().then(result => {
      result;
    }).finally(() => {
      toast.success(`Login efetuado com sucesso!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        pauseOnHover: false,
      });
    });
  };

  const handlerLogoutClick = async () => {
    await signOut().then(result => {
      result;
    }).finally(() => {
      localStorage.removeItemItem("@fsw-store/cart-products");
      toast.success(`Logout efetuado com sucesso!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        pauseOnHover: false,
      });
    });
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

                {data?.user?.image && (
                  <AvatarImage
                    width="45"
                    style={{ borderRadius: 25, border: "1px solid white" }}
                    src={data?.user?.image}
                  />
                )}
              </Avatar>

              <div className="flex-col text-center">
                <p className="font-medium">{data?.user?.name}</p>
                <p className="text-sm opacity-75">Boas compras!</p>
              </div>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-2">
            {status == "unauthenticated" ? (
              <SheetClose asChild>
                <Button
                  size="icon"
                  variant="default"
                  onClick={handlerLoginClick}
                  className="w-full justify-start gap-1.5 p-2"
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
                    className="w-full justify-start gap-1.5 p-2"
                  >
                    <LogOutIcon size={16}></LogOutIcon>Sair
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={`/`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-full justify-start gap-1.5 p-2"
                    >
                      <HomeIcon size={16} />
                      Início
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-1.5 p-2"
                  >
                    <PercentIcon size={16} />
                    Ofertas
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={`/catalog`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-full justify-start gap-1.5 p-2"
                    >
                      <ListOrderedIcon size={16} />
                      Catálogo
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
          <Button size="icon" variant="outline">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetClose asChild>
            <Cart />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
