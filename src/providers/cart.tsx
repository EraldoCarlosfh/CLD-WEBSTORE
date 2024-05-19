"use client";
import { Products } from "@prisma/client";
import React, { createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends Products {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
  updateQuantityProduct: (product: CartProduct) => void;
  removeProductsToCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
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

    setProducts((prev) => [...prev, product]);
    var productsStorage: Products[] = JSON.parse(
      localStorage.getItem("@cld-webstore/cart-products") || "[]",
    );
    if (productsStorage) {
      productsStorage.push(product);
      localStorage.setItem(
        "@cld-webstore/cart-products",
        JSON.stringify(productsStorage),
      );
    } else {
      localStorage.setItem(
        "@cld-webstore/cart-products",
        JSON.stringify(products),
      );
    }
  };

  const removeProductsToCart = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id != productId));
  };

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@cld-webstore/cart-products") || "[]"),
    );
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        addProductsToCart,
        updateQuantityProduct,
        removeProductsToCart,
        cartTotalPrice: total,
        cartBasePrice: subTotal,
        cartTotalDiscount: totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
