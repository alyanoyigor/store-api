import { Schema, model } from 'mongoose';
import { TProduct } from '../types';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model('Product', productSchema);
