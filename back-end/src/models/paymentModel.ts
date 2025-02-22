import { PrismaClient, PaymentMethod, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const PaymentModel = {
    // Membuat pembayaran baru
    create: (data: {
        orderId: string;
        userId: string;
        amount: number;
        method: PaymentMethod;
        status?: PaymentStatus;
    }) => prisma.payment.create({ data }),

    // Mencari pembayaran berdasarkan ID
    findById: (id: string) => prisma.payment.findUnique({ where: { id } }),

    // Mengupdate status pembayaran
    updateStatus: (id: string, status: PaymentStatus) => prisma.payment.update({
        where: { id },
        data: { status }
    }),
};