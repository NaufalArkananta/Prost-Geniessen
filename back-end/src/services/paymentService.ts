import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { PaymentModel } from '../models/paymentModel';

export class PaymentService {
    static async createPayment(data: {
        orderId: string;
        userId: string;
        amount: number;
        method: PaymentMethod;
    }) {
        return PaymentModel.create({ ...data, status: PaymentStatus.PENDING });
    }

    static async getPaymentById(id: string) {
        return PaymentModel.findById(id);
    }

    static async updatePaymentStatus(id: string, status: PaymentStatus) {
        return PaymentModel.updateStatus(id, status);
    }
}