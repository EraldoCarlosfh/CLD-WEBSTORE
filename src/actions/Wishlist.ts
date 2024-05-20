"use server";

import { prismaClient } from "@/lib/prisma";

export const addProductToWishlist = async (
    userId: string,
    productId: string,
    wishListId?: string,
) => {
    let wishLists;

    if (wishListId) {
        wishLists = await prismaClient.wishLists.findFirstOrThrow({
            where: {
                userId: userId,
                id: wishListId,
            },
        });
    } 
    
    if(!wishListId) {
        wishLists = await prismaClient.wishLists.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!wishLists) {
            wishLists = await prismaClient.wishLists.create({
                data: {
                    userId: userId,
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
            wishLists: {
                connect: {
                    id: wishLists!.id,
                },
            },
        },
    });
};
