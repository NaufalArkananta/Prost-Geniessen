import { ShipmentStatus } from '@prisma/client';
import { ShipmentModel } from '../models/shipmentModel';

export class ShipmentService {
    static async createShipment(data: {
        orderId: string;
        trackingNumber: string;
        courier: string;
        estimatedDelivery: Date;
    }) {
        return ShipmentModel.create({ ...data, status: ShipmentStatus.PENDING });
    }

    static async getShipmentById(id: string) {
        return ShipmentModel.findById(id);
    }

    static async updateShipmentStatus(id: string, status: ShipmentStatus) {
        return ShipmentModel.updateStatus(id, status);
    }
}