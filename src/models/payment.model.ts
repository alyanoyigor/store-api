import { Schema, model } from 'mongoose';
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

export default model('Payment', paymentSchema);
