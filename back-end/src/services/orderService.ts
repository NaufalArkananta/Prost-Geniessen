import { OrderModel } from '../models/orderModel';
import { OrderStatus } from '@prisma/client';

export class OrderService {
    static async createOrder(userId: string, totalPrice: number) {
        return OrderModel.create({ userId, totalPrice, status: OrderStatus.PENDING });
    }

    static async getOrderById(id: string) {
        return OrderModel.findById(id);
    }

    static async updateOrderStatus(id: string, status: OrderStatus) {
        return OrderModel.updateStatus(id, status);
    }

    static async deleteOrder(id: string) {
        return OrderModel.delete(id);
    }
}