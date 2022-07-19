import { CartStatus, PaymentStatus } from '../enums';
import CartModel from '../models/cart.model';
import PaymentModel from '../models/payment.model';
import { TPayment } from '../types';

class PaymentService {
  constructor(private cartModel: CartModel = new CartModel()) {}

  async createPayment(data: TPayment) {
    const payment = new PaymentModel(data);
    await payment.save();

    return payment;
  }

  async updatePayment(data: Partial<TPayment>, findParam: Partial<TPayment>) {
    const payment = await PaymentModel.findOne(findParam);
    const model = new PaymentModel(payment);
    const updatedPayment = model.set(data);
    await model.save();
    return updatedPayment;
  }

  async runUpdatePaymentProcess(
    data: Partial<TPayment>,
    findParam: Partial<TPayment>
  ) {
    const updatedPayment = await this.updatePayment(data, findParam);

    if (updatedPayment.status === PaymentStatus.done) {
      this.cartModel.updateCart(
        { status: CartStatus.payed },
        { _id: updatedPayment.cartId }
      );
    }

    return updatedPayment;
  }
}

export default PaymentService;
