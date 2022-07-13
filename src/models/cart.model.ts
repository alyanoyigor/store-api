import { Schema, model } from 'mongoose';
import { TCart, TCartProduct } from '../types';

const cartProductSchema = new Schema<TCartProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

const cartSchema = new Schema<TCart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: {
      type: [cartProductSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'payed', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default model('Cart', cartSchema);
