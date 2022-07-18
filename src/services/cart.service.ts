import { ObjectId } from 'mongoose';
import { CartStatus, PaymentStatus } from '../enums';
import CartModel from '../models/cart.model';
import ProductModel from '../models/product.model';
import { TCart, TCartProduct } from '../types';
import PaymentService from './payment.service';

class CartService {
  constructor(private paymentService: PaymentService = new PaymentService()) {}

  async createCart(data: TCart) {
    try {
      const cart = await this.findCartByParam({ userId: data.userId });

      if (cart) {
        throw new Error('Cart already exist!');
      }

      const newCart = new CartModel(data);
      await newCart.save();

      await this.paymentService.createPayment({ cartId: newCart.id });

      return newCart;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async findCartByParam(param: Partial<TCart>) {
    return await CartModel.findOne(param);
  }

  updateProductsPrice(products: TCartProduct[]) {
    return products.map(async (productItem) => {
      const product = await ProductModel.findById(productItem.productId);

      if (!product) {
        throw new Error('Invalid product id');
      }

      return { ...productItem, total: product.price * productItem.quantity };
    });
  }

  async getCart(id: string) {
    return await this.findCartByParam({ _id: id });
  }

  validateCartBeforeUpdate(status: CartStatus | undefined) {
    switch (status) {
      case CartStatus.deleted: {
        throw new Error('Cart was deleted');
      }

      case CartStatus.payed: {
        throw new Error('Cart already payed');
      }

      default:
        break;
    }
  }

  async updateCart(data: Partial<TCart>, id: string) {
    const cart = await this.findCartByParam({ _id: id });
    this.validateCartBeforeUpdate(cart?.status);

    const model = new CartModel(cart);
    const updatedCart = model.set(data);

    let changedCart;
    if (data.products?.length === 0 || data.status === CartStatus.deleted) {
      changedCart = updatedCart.set({ status: CartStatus.deleted });
      this.paymentService.updatePayment(
        { status: PaymentStatus.canceled },
        { cartId: id as unknown as ObjectId }
      );
    } else {
      const productList = this.updateProductsPrice(updatedCart.products);
      const products = await Promise.all(productList);

      changedCart = updatedCart.set({ products });
    }

    await model.save();

    return changedCart;
  }
}

export default CartService;
