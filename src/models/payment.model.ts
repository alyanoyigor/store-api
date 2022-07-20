import { Schema } from 'mongoose';
import modelMixin from '../mixins/modelMixin';
import { TPayment } from '../types';

const paymentSchema = new Schema<TPayment>(
  {
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    status: {
      type: String,
      enum: ['created', 'done', 'canceled'],
      default: 'created',
    },
  },
  { timestamps: true }
);

class PaymentModel extends modelMixin<TPayment>('Payment', paymentSchema) {
  async createPayment(data: TPayment) {
    const payment = new this.Model(data);
    await payment.save();

    return payment;
  }

  async findPaymentByParam(param: Partial<TPayment>) {
    return await this.findByParam(param);
  }

  async updatePayment(data: Partial<TPayment>, findParam: Partial<TPayment>) {
    const payment = await this.findPaymentByParam(findParam);
    const updatedPayment = new this.Model(payment);

    updatedPayment.set(data);
    await updatedPayment.save();

    return updatedPayment;
  }
}

export default PaymentModel;
