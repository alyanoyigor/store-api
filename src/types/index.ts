import { Schema } from 'mongoose';
import { CartStatus, PaymentStatus } from '../enums';

export type TCartProduct = {
  productId: typeof Schema.Types.ObjectId;
  quantity: number;
  total: number;
};

export type TCart = {
  userId: typeof Schema.Types.ObjectId;
  products?: TCartProduct[];
  status?: CartStatus.active | CartStatus.payed | CartStatus.deleted;
};

export type TPayment = {
  cartId: Schema.Types.ObjectId;
  status?: PaymentStatus.canceled | PaymentStatus.created | PaymentStatus.done;
};

export type TProduct = {
  name: string;
  category: string;
  price: number;
};

export type TUser = {
  name: string;
  email: string;
};
