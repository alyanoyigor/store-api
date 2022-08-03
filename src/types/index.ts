import { Document, Types } from 'mongoose';
import { CartStatus, PaymentStatus } from '../enums';

export type TCartProduct = {
  productId: Types.ObjectId;
  quantity: number;
  total: number;
};

export type TCart = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: TCartProduct[];
  status?: CartStatus;
};

export type TPayment = {
  cartId: Types.ObjectId;
  _id?: string;
  status?: PaymentStatus;
};

export type TProduct = {
  name: string;
  category: string;
  price: number;
};

export type TUser = {
  _id?: string;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
};

export type TUserInput = {
  name: string;
  email: string;
  password: string;
};

export type Context = {
  token?: string;
  user?: Document<unknown, any, TUser> & TUser;
};
