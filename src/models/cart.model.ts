import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'payed', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default model('Cart', cartSchema);
