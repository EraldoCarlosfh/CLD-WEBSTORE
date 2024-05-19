"use client";
import { Products } from "@prisma/client";
import React, { createContext, useState } from "react";

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

  function updateQuantityProduct(product: CartProduct) {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id == product.id) {
          if (product.quantity != 0)
            return {
              ...cartProduct,
              quantity: product.quantity,
            };
          else setProducts(products.filter((x) => x.id != product.id));
        }
        return cartProduct;
      }),
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
  };

  const removeProductsToCart = (productId: string) => {
    setProducts(products.filter((product) => product.id != productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductsToCart,
        updateQuantityProduct,
        removeProductsToCart,
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
