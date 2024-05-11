import { Products } from "@prisma/client";

interface ProductWithTotalPrice extends Products {
    totalPrice: number;
}

export const computeProductPrice = (product: Products) => {
    if (product.discountPercentage == 0) {
        return {
            ...product,
            totalPrice: product.basePrice.toNumber()
        }
    } else {
        return {
            ...product,
            totalPrice: product.totalPrice.toNumber()
        }
    }


    const totalPrice = (product.basePrice.toNumber()) * (product.discountPercentage / 100);

    return {
        ...product,
        totalPrice
    }
}