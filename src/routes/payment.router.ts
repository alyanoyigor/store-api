import express from 'express';
import PaymentController from '../controllers/payment.controller';

const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.patch(
  '/:id',
  paymentController.updatePayment.bind(paymentController)
);

export default paymentRouter;
