import { Request, Response } from 'express';
import PaymentModel from '../models/payment.model';
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
      model.save();
      return formatSuccessResponse(res, updatedPayment);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }
}

export default PaymentController;
