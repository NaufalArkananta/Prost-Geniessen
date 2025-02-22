import prisma from "../config/database";

export const CartModel = {
    findCartByUserId: (userId: string) => prisma.cart.findUnique({
        where: { userId },
        include: { cartItems: true }
    }),

    findCartItem: (userId: string, productId: string) => prisma.cartItem.findFirst({
        where: {
            cart: { userId }, // Cari cart yang dimiliki oleh userId
            productId
        }
    }),

    createCart: (userId: string) => prisma.cart.create({
        data: {
            userId,
            cartItems: { create: [] } // Inisialisasi cartItems sebagai array kosong
        },
        include: { cartItems: true } // Sertakan cartItems dalam respons
    }),

    updateCartItem: (id: string, quantity: number, price: number, subtotal: number) => {
        return prisma.cartItem.update({
            where: { id },
            data: {
                quantity,
                price,
                subtotal
            }
        });
    },
    
    addToCart: (userId: string, productId: string, quantity: number, price: number, subtotal: number) => {
        return prisma.cartItem.create({
            data: {
                cart: { connect: { userId } }, // Hubungkan ke cart yang dimiliki oleh userId
                product: { connect: { id: productId } }, // Hubungkan ke product dengan productId
                quantity,
                price,
                subtotal
            }
        });
    },
    
    deleteItems: (ids: string[]) => prisma.cartItem.deleteMany({
        where: { id: { in: ids } } // Hapus item dengan id yang ada di array `ids`
    }),
};
