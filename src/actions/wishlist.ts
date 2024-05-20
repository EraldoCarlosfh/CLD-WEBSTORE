"use server";

import { prismaClient } from "@/lib/prisma";

export const addProductToWishlist = async (
    userId: string,
    productId: string,
    wishListId?: string,
) => {
    let wishListProducts;

    if (wishListId) {
        wishListProducts = await prismaClient.wishListProducts.findFirstOrThrow({
            where: {
                userId: userId,
                id: wishListId,
            },
        });
    } 
    
    if(!wishListId) {
        wishListProducts = await prismaClient.wishListProducts.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!wishListProducts) {
            wishListProducts = await prismaClient.wishListProducts.create({
                data: {
                    userId: userId,
                    productId: productId,
                    name: 'Favoritos',
                },
            });
        }
    }

    await prismaClient.products.update({
        where: {
            id: productId,
        },
        data: {
            wishListProducts: {
                connect: {
                    id: wishListProducts!.id,
                },
            },
        },
    });
};
