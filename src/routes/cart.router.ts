import express from 'express';
import CartController from '../controllers/cart.controller';
import CartService from '../services/cart.service';
import PaymentService from '../services/payment.service';

const cartRouter = express.Router();
const paymentService = new PaymentService();
const cartService = new CartService(paymentService);
const cartController = new CartController(cartService);

cartRouter.get('/:id', cartController.getCart.bind(cartController));
cartRouter.post('/', cartController.createCart.bind(cartController));
cartRouter.patch('/:id', cartController.updateCart.bind(cartController));

export default cartRouter;
