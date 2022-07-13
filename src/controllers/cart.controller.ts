import { Request, Response } from 'express';
import { CartStatus, PaymentStatus } from '../enums';
import CartModel from '../models/cart.model';
import PaymentModel from '../models/payment.model';
import ProductModel from '../models/product.model';
import {
  formatErrorResponse,
  formatSuccessResponse,
} from '../services/http.service';
import { TCart } from '../types';
import PaymentController from './payment.controller';

class CartController {
  constructor(private payment: PaymentController = new PaymentController()) {}

  async createCart(data: TCart) {
    try {
      const cart = new CartModel(data);

      await cart.save();
      this.payment.createPayment({ cartId: cart.id });

      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  updateProductsPrice(cart: TCart) {
    const products = cart.products;

    if (!products) {
      return [];
    }

    return products.map(async (productItem) => {
      const product = await ProductModel.findById(productItem.productId);

      if (!product) {
        throw new Error('Invalid product id');
      }

      return { ...productItem, total: product.price * productItem.quantity };
    });
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const cart = await CartModel.findById(req.params.id);

      const model = new CartModel(cart);
      const updatedCart = model.set({ status: CartStatus.deleted });
      await model.save();

      await PaymentModel.findOneAndUpdate(
        { cartId: updatedCart.id },
        { status: PaymentStatus.canceled }
      );

      this.createCart({ userId: updatedCart.userId });

      return formatSuccessResponse(res, updatedCart);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const cart = await CartModel.findById(req.params.id);

      if (cart?.status === CartStatus.deleted) {
        throw new Error('Cart was deleted');
      }

      const model = new CartModel(cart);
      const updatedCart = model.set(req.body);

      const productList = this.updateProductsPrice(
        updatedCart as unknown as TCart
      );
      const products = await Promise.all(productList);

      const changedCart = updatedCart.set({ products });
      await model.save();

      return formatSuccessResponse(res, changedCart);
    } catch (error: any) {
      return formatErrorResponse(res, error?.message || error);
    }
  }
}

export default CartController;
