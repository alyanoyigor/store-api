import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        status: {
          type: String,
          enum: ['active', 'payed', 'deleted'],
          required: true,
        },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model('Cart', cartSchema);
