"use client";
import { Products } from "@prisma/client";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export interface CartProduct extends Products {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  total: number;
  subTotal: number;
  totalDiscount: number;
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
  updateQuantityProduct: (product: CartProduct) => void;
  removeProductsToCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductsToCart: () => {},
  updateQuantityProduct: () => {},
  removeProductsToCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subTotal - total;

  function updateQuantityProduct(product: CartProduct) {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id == product.id) {
            return {
              ...cartProduct,
              quantity: product.quantity,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    ); 
    return;
  }

  const addProductsToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id == product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id == product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }

    toast.success(`${product.name} adicionado ao carrinho com sucesso!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      pauseOnHover: false,
    });

    setProducts((prev) => [...prev, product]);
  };

  const removeProductsToCart = (productId: string) => {
    const product = products.find((product) => product.id == productId)?.name;
    setProducts((prev) => prev.filter((product) => product.id != productId));

    toast.success(`${product} removido do carrinho com sucesso!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@fsw-store/cart-products") || "[]"),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products));
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        products,
        addProductsToCart,
        updateQuantityProduct,
        removeProductsToCart,
        total,
        subTotal,
        totalDiscount,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
