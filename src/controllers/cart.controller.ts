import { Request, Response } from 'express';
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
      const cartData = await this.cartService.getCart(req.params.id);
      return formatSuccessResponse(res, cartData);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const cartData = await this.cartService.updateCart(
        req.body,
        req.params.id
      );
      return formatSuccessResponse(res, cartData);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }
}

export default CartController;
