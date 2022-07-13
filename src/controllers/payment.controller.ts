import { Request, Response } from 'express';
import { CartStatus, PaymentStatus } from '../enums';
import PaymentModel from '../models/payment.model';
import CartModel from '../models/cart.model';
import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';
import { TPayment } from '../types';

class PaymentController {
  async createPayment(data: TPayment) {
    try {
      const payment = new PaymentModel(data);
      await payment.save();
      return payment;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const payment = await PaymentModel.findById(req.params.id);

      const model = new PaymentModel(payment);
      const updatedPayment = model.set(req.body);
      await model.save();

      if (req.body.status === PaymentStatus.done) {
        const cart = await CartModel.findById(updatedPayment.cartId);
        const cartModel = new CartModel(cart);
        cartModel.set({ status: CartStatus.payed });
        await cartModel.save();
      }

      return formatSuccessResponse(res, updatedPayment);
    } catch (error: any) {
      return formatErrorResponse(res, error?.message || error);
    }
  }
}

export default PaymentController;
