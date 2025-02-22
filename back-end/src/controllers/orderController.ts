import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { sendResponse } from '../utils/responseHandler';

export class OrderController {
    static async createOrder(req: Request, res: Response) {
        try {
            const { userId, totalPrice } = req.body;
            const order = await OrderService.createOrder(userId, totalPrice);
            sendResponse(res, 201, 'Order created successfully', order);
        } catch (error) {
            console.error(error);
            sendResponse(res, 500, 'Internal server error', null);
        }
    }

    static async getOrderById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(id);
            if (order) {
                sendResponse(res, 200, 'Order found successfully', order);
            } else {
                sendResponse(res, 404, 'Order not found', null);
            }
        } catch (error) {
            console.error(error);
            sendResponse(res, 500, 'Internal server error', null);
        }
    }

    static async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await OrderService.updateOrderStatus(id, status);
            sendResponse(res, 200, 'Order status updated successfully', order);
        } catch (error) {
            console.error(error);
            sendResponse(res, 500, 'Internal server error', null);
        }
    }

    static async deleteOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await OrderService.deleteOrder(id);
            sendResponse(res, 200, 'Order deleted successfully', null);
        } catch (error) {
            console.error(error);
            sendResponse(res, 500, 'Internal server error', null);
        }
    }
}