import { Request, Response } from 'express';
import { Types } from 'mongoose';
import CartService from '../services/cart.service';
import {
  formatErrorResponse,
  formatSuccessResponse,
} from '../services/http.service';

class CartController {
  constructor(private cartService: CartService = new CartService()) {}

  async createCart(req: Request, res: Response) {
    try {
      const cartData = await this.cartService.createCart(req.body);
      return formatSuccessResponse(res, cartData);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);
      const cartData = await this.cartService.getCart({
        _id: id,
      });

      if (!cartData) {
        throw new Error('Invalid cart id!');
      }

      return formatSuccessResponse(res, cartData);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);
      const cartData = await this.cartService.updateCart(req.body, {
        _id: id,
      });
      return formatSuccessResponse(res, cartData);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }
}

export default CartController;
