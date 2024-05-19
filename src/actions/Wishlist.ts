// "use server";

// import { prismaClient } from "@/lib/prisma";

// export const addProductToWishlist = async (
//     userId: string,
//     productId: string,
//     wishlistId?: string,
// ) => {
//     let wishlist;

//     if (wishlistId) {
//         wishlist = await prismaClient.wishLists.findFirstOrThrow({
//             where: {
//                 userId: userId,
//                 id: wishlistId,
//             },
//         });
//     } 
    
//     if(!wishlistId) {
//         wishlist = await prismaClient.wishLists.findFirst({
//             where: {
//                 userId: userId,
//             },
//         });

//         if (!wishlist) {
//             wishlist = await prismaClient.wishLists.create({
//                 data: {
//                     userId: userId,
//                     name: 'Favoritos',
//                 },
//             });
//         }
//     }

//     await prismaClient.products.update({
//         where: {
//             id: productId,
//         },
//         data: {
//             wishLists: {
//                 connect: {
//                     id: wishlist!.id,
//                 },
//             },
//         },
//     });
// };
