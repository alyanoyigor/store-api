import express from 'express';
import CartController from '../controllers/cart.controller';
import CartModel from '../models/cart.model';
import PaymentModel from '../models/payment.model';
import CartService from '../services/cart.service';

const cartRouter = express.Router();

const cartModel = new CartModel();
const paymentModel = new PaymentModel();

const cartService = new CartService(cartModel, paymentModel);
const cartController = new CartController(cartService);

cartRouter.get('/:id', cartController.getCart.bind(cartController));
cartRouter.post('/', cartController.createCart.bind(cartController));
cartRouter.patch('/:id', cartController.updateCart.bind(cartController));

export default cartRouter;
