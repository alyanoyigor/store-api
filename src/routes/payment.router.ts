import express from 'express';
import PaymentController from '../controllers/payment.controller';
import PaymentService from '../services/payment.service';

const paymentRouter = express.Router();
const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

paymentRouter.post(
  '/',
  paymentController.createPayment.bind(paymentController)
);

paymentRouter.patch(
  '/:id',
  paymentController.updatePayment.bind(paymentController)
);

export default paymentRouter;
