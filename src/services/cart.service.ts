import { Document, Types } from 'mongoose';
import { CartStatus, PaymentStatus } from '../enums';
import CartModel from '../models/cart.model';
import ProductModel from '../models/product.model';
import PaymentModel from '../models/payment.model';
import { TCart, TCartProduct } from '../types';

class CartService {
  constructor(
    private cartModel: CartModel = new CartModel(),
    private paymentModel: PaymentModel = new PaymentModel()
  ) {}

  async createCart(data: TCart) {
    const existingCart = await this.cartModel.findCartByParam({
      userId: data.userId,
    });

    if (existingCart) {
      throw new Error('Cart already exist!');
    }

    const cart = await this.cartModel.createCart(data);
    await this.paymentModel.createPayment({ cartId: cart.id });

    return cart;
  }

  async getCart(param: Partial<TCart>) {
    return await this.cartModel.findCartByParam(param);
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

  async updateCart(data: Partial<TCart>, param: Pick<TCart, '_id'>) {
    const cart = await this.cartModel.updateCart(data, param);
    this.validateCartBeforeUpdate(cart.status);

    if (this.isCartEmpty(cart)) {
      await this.emptyCartHandler(cart, param._id);
    } else {
      await this.updateProducts(cart);
    }

    await cart.save();

    return cart;
  }

  private async updateProducts(
    updatedCart: Document<unknown, any, TCart> &
      TCart & {
        _id: Types.ObjectId;
      }
  ) {
    const productList = this.updateProductsPrice(updatedCart.products);
    const products = await Promise.all(productList);
    updatedCart.set({ products });
  }

  private async emptyCartHandler(
    updatedCart: Document<unknown, any, TCart> &
      TCart & {
        _id: Types.ObjectId;
      },
    cartId: Types.ObjectId
  ) {
    updatedCart.set({ status: CartStatus.deleted });
    await this.paymentModel.updatePayment(
      { status: PaymentStatus.canceled },
      { cartId }
    );
  }
  
  private updateProductsPrice(products: TCartProduct[]) {
    return products.map(async (productItem) => {
      const product = await ProductModel.findById(productItem.productId);

      if (!product) {
        throw new Error('Invalid product id');
      }

      return { ...productItem, total: product.price * productItem.quantity };
    });
  }

  private isCartEmpty(cart: TCart) {
    return cart.products.length === 0 || cart.status === CartStatus.deleted;
  }
}

export default CartService;
