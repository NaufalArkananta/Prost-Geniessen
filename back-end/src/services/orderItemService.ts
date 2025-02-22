import { OrderItemModel } from '../models/orderItemModel';

export class OrderItemService {
    static async addItemToOrder(data: {
        orderId: string;
        productId: string;
        quantity: number;
        price: number;
        subtotal: number;
    }) {
        return OrderItemModel.create(data);
    }

    static async getItemById(id: string) {
        return OrderItemModel.findById(id);
    }

    static async removeItemFromOrder(id: string) {
        return OrderItemModel.delete(id);
    }
}