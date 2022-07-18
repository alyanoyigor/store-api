import { CartStatus, PaymentStatus } from '../enums';
import CartModel from '../models/cart.model';
import PaymentModel from '../models/payment.model';
import { TPayment } from '../types';

class PaymentService {
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

    if (data.status === PaymentStatus.done) { 
      const cart = await CartModel.findById(updatedPayment.cartId);
      const cartModel = new CartModel(cart);
      cartModel.set({ status: CartStatus.payed });
      await cartModel.save();
    }

    return updatedPayment;
  }
}

export default PaymentService;
