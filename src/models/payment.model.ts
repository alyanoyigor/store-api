import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    status: {
      type: String,
      enum: ['created', 'done', 'canceled'],
      default: 'created',
    },
  },
  { timestamps: true }
);

export default model('Payment', paymentSchema);
