import prisma from '../config/database';

export const OrderItemModel = {
    // Menambahkan item ke order
    create: (data: {
        orderId: string;
        productId: string;
        quantity: number;
        price: number;
        subtotal: number;
    }) => prisma.orderItem.create({ data }),

    // Mencari item berdasarkan ID
    findById: (id: string) => prisma.orderItem.findUnique({ where: { id } }),

    // Menghapus item dari order
    delete: (id: string) => prisma.orderItem.delete({ where: { id } }),
};