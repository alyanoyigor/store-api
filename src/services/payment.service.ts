import { CartStatus, PaymentStatus } from '../enums';
import CartModel from '../models/cart.model';
import PaymentModel from '../models/payment.model';
import { TPayment } from '../types';

class PaymentService {
  constructor(
    private paymentModel: PaymentModel = new PaymentModel(),
    private cartModel: CartModel = new CartModel()
  ) {}

  async createPayment(data: TPayment) {
    return await this.paymentModel.createPayment(data);
  }

  async updatePayment(data: Partial<TPayment>, param: Partial<TPayment>) {
    return await this.paymentModel.updatePayment(data, param);
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
