import { Request, Response } from 'express';
import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';
import PaymentService from '../services/payment.service';

class PaymentController {
  constructor(private paymentService: PaymentService = new PaymentService()) {}

  async createPayment(req: Request, res: Response) {
    try {
      const paymentData = this.paymentService.createPayment(req.body);
      return formatSuccessResponse(res, paymentData);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const updatedPayment = await this.paymentService.updatePayment(req.body, {
        _id: req.params.id,
      });
      return formatSuccessResponse(res, updatedPayment);
    } catch (error: any) {
      return formatErrorResponse(res, error?.message || error);
    }
  }
}

export default PaymentController;
