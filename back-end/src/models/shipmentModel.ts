import { PrismaClient, ShipmentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const ShipmentModel = {
    // Membuat pengiriman baru
    create: (data: {
        orderId: string;
        trackingNumber: string;
        courier: string;
        estimatedDelivery: Date;
        status?: ShipmentStatus;
    }) => prisma.shipment.create({ data }),

    // Mencari pengiriman berdasarkan ID
    findById: (id: string) => prisma.shipment.findUnique({ where: { id } }),

    // Mengupdate status pengiriman
    updateStatus: (id: string, status: ShipmentStatus) => prisma.shipment.update({
        where: { id },
        data: { status }
    }),
};