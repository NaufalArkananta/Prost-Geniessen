import { OrderStatus } from "@prisma/client";
import prisma from "../config/database";

export const OrderModel = {
    // Membuat order baru
    create: (data: {
        userId: string;
        totalPrice: number;
        status?: OrderStatus;
    }) => prisma.order.create({ data }),

    // Mencari order berdasarkan ID
    findById: (id: string) => prisma.order.findUnique({
        where: { id },
        include: { orderItems: true, payments: true, shipment: true }
    }),

    // Mengupdate status order
    updateStatus: (id: string, status: OrderStatus) => prisma.order.update({
        where: { id },
        data: { status }
    }),

    // Menghapus order
    delete: (id: string) => prisma.order.delete({ where: { id } }),
};