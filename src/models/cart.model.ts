import { Schema, model } from 'mongoose';
import modelMixin from '../mixins/modelMixin';
import { TCart, TCartProduct } from '../types';

const cartProductSchema = new Schema<TCartProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

const cartSchema = new Schema<TCart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: {
      type: [cartProductSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'payed', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

class CartModel extends modelMixin<TCart>('Cart', cartSchema) {
  async createCart(data: TCart) {
    const cart = new this.Model(data);
    await cart.save();
    return cart;
  }

  async findCartByParam(param: Partial<TCart>) {
    return await this.Model.findOne(param);
  }

  async updateCart(data: Partial<TCart>, param: Partial<TCart>) {
    const cart = await this.findCartByParam(param);
    const updatedCart = new this.Model(cart);

    updatedCart.set(data);
    await updatedCart.save();

    return updatedCart;
  }
}

export default CartModel;
